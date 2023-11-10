import React from "react";
import styles from "./submit-order.module.css";
import submittedOrderImg from "../../../images/order-submit.svg";
import {useSelector} from 'react-redux';
import {
    selectOrderId,
    selectOrderIdStatus,
    selectOrderIdError
} from "../../../services/submit-order/selector";
import LoadingComponent from "../../../utils/loading-component";

const SubmitOrder = () => {
    const {orderId, orderIdFetchStatus, orderIdFetchError} = useSelector(state => ({
        orderId: selectOrderId(state),
        orderIdFetchStatus: selectOrderIdStatus(state),
        orderIdFetchError: selectOrderIdError(state)
    }));

    let content;

    if (orderIdFetchStatus === 'loading') {
        content = <div className="modal-backdrop"><LoadingComponent/></div>
    } else if (orderIdFetchStatus === 'failed' && orderIdFetchStatus !== 'loading') {
        content = <div className="modal-backdrop">{orderIdFetchError}</div>
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