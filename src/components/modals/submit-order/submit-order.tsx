import React from "react";
import styles from "./submit-order.module.css";
import submittedOrderImg from "../../../images/order-submit.svg";
import {useSelector} from 'react-redux';
import {
    selectOrderNumber,
    selectOrderNumberStatus,
    selectOrderNumberError
} from "../../../services/submit-order/selector";
import LoadingComponent from "../../../utils/loading-component";
import {AsyncThunkStatuses} from "../../../utils/types";

const SubmitOrder = (): React.JSX.Element => {
    const {orderId, orderIdFetchStatus, orderIdFetchError} = useSelector(state => ({
        orderId: selectOrderNumber(state),
        orderIdFetchStatus: selectOrderNumberStatus(state),
        orderIdFetchError: selectOrderNumberError(state)
    }));

    let content;

    if (orderIdFetchStatus === AsyncThunkStatuses.loading) {
        content = <div className="modal-backdrop"><LoadingComponent/></div>
    } else if (orderIdFetchStatus === AsyncThunkStatuses.failed) {
        content = <div className="modal-backdrop text_type_digits-medium">{orderIdFetchError}</div>
    } else {
        content = (
            <div className={styles.container}>
                <p className={`${styles['order-id']} text text_type_digits-large mb-8`}
                   aria-label="Номер заказа">{orderId}</p>
                <h2 className="text text_type_main-medium">идентификатор заказа</h2>
                <img className={styles.img} src={submittedOrderImg} alt='Заказ принят.' width='110' height='110'/>
                <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                    станции</p>
            </div>
        )
    }
    return (
        <>
            {content}
        </>
    );
};

export default SubmitOrder;