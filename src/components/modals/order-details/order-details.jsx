import React, {useContext} from "react";
import styles from "./order-details.module.css";
import submittedOrderImg from "../../../images/submitted-order.svg";
import {OrderDetailsContext} from "../../../services/contexts/orderDetailsContext";

const OrderDetails = () => {

    const { orderId, idIsLoading, idError } = useContext(OrderDetailsContext);

    return (
        <div className={styles.container}>
            {idIsLoading && <p className={`${styles['api-msg']} text text_type_main-medium text_color_inactive mt-15 pt-2 mb-8`}>Загрузка...</p>}
            {!idIsLoading && idError && <p className={`${styles['api-msg']} text text_type_main-medium text_color_inactive mt-15 pt-2 mb-8`}>Произошла ошибка. Пожалуйста, перезагрузите страницу.</p>}
            {!idIsLoading && !idError && <h3 className="text text_type_digits-large mt-15 pt-2 mb-8">{orderId}</h3>}
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img className={styles.img} src={submittedOrderImg} alt='Заказ принят.' width='110' height='110'/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                станции</p>
        </div>
    );
};

export default OrderDetails;