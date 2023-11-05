import styles from "./orders-feed.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {
    connect as connectFeedOrders,
    disconnect as disconnectFeedOrders
} from "../../services/orders-feed/actions";
import {WS_URL} from "../../api/ws-api";
import Orders from "../../components/orders/orders";

const OrdersFeed = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectFeedOrders(`${WS_URL}/orders/all`));
        return () => {
            // Disconnect WebSocket when the component unmounts
            dispatch(disconnectFeedOrders());
        };
    }, [dispatch]);

    const {orders, total, totalToday} = useSelector(
        (state) => state.ordersFeed);

    const lastTenReadyOrdersIds = useMemo(() => {
        return orders.filter(order => order.status === 'done').map(order => order.number).slice(-10);
    }, [orders]);

    const lastTenInProgressOrdersIds = useMemo(() => {
        return orders.filter(order => order.status === 'inprogress').map(order => order.number).slice(-10);
    }, [orders]);

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <div className={`${styles.content} mt-4`}>

                <Orders orders={orders}/>

                <section className={styles[`stats-sections`]}>
                    <div className={styles[`orders-statuses`]}>
                        <div className={styles[`orders-ready`]}>
                            <h2 className="text text_type_main-medium">Готовы:</h2>
                            <ul className={styles[`orders-ids-list`]}>
                                {lastTenReadyOrdersIds.map(order =>
                                    <li key={order}
                                        className={`${styles[`order-ready-item`]} text text_type_digits-default`}>{order}</li>
                                )}
                            </ul>
                        </div>
                        <div className={styles[`orders-inprogress`]}>
                            <h2 className={`${styles[`header-in-progress`]} text text_type_main-medium`}>В работе:</h2>
                            <ul className={styles[`orders-list`]}>
                                {lastTenInProgressOrdersIds.map(order =>
                                    <li key={order}
                                        className={`${styles[`order-inprogress-item`]} text text_type_digits-default`}>{order}</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                        <p className={`${styles[`total-orders`]} text text_type_digits-large`}>{total}</p>
                    </div>
                    <div>
                        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                        <p className={`${styles[`total-orders`]} text text_type_digits-large`}>{totalToday}</p>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default OrdersFeed;