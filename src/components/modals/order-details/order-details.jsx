import React from "react";
import styles from "./order-details.module.css";
import submittedOrderImg from "../../../images/submitted-order.svg";
import {useSelector} from 'react-redux';
import {selectOrderId, isLoadingOrderId, hasErrorOrderId} from "../../../services/orderDetails/selector";
import useLoadingAndErrorHandling from "../../../hooks/useLoadingAndErrorHandling";
import LoadingComponent from "../../../utils/loading-component";
import ErrorComponent from "../../../utils/error-component";

const OrderDetails = () => {
    const {isLoading, hasError} = useLoadingAndErrorHandling(isLoadingOrderId, hasErrorOrderId);
    const orderId = useSelector(selectOrderId);

    return (
        <div className={styles.container}>
            {isLoading && <div className={styles.backdrop}><LoadingComponent isLoading={isLoading}/></div>}
            {!isLoading && hasError &&
                <div className={styles.error}><ErrorComponent/></div>}
            {!isLoading && !hasError &&
                <>
                    <h3 className={`${styles['order-id']} text text_type_digits-large mb-8`}>{orderId}</h3>
                    <p className="text text_type_main-medium">идентификатор заказа</p>
                    <img className={styles.img} src={submittedOrderImg} alt='Заказ принят.' width='110' height='110'/>
                    <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                        станции</p>
                </>
            }

        </div>
    );
};

export default OrderDetails;