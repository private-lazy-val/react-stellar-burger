import styles from "./orders-feed.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getIngredientsTotalPrice} from "../../utils/ingredients-details";
import useModal from "../../hooks/use-modal";
import {Link, useLocation} from "react-router-dom";
import {selectIngredientsMap} from "../../services/burger-ingredients/selector";
import {
    connect as connectFeedOrders,
    disconnect as disconnectFeedOrders
} from "../../services/orders-feed/actions";
import {WS_URL} from "../../api/ws-api";

const OrdersFeed = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        openOrderModal
    } = useModal();

    useEffect(() => {
        console.log('hello')
            dispatch(connectFeedOrders(`${WS_URL}/orders/all`));
            return () => {
                // Disconnect WebSocket when the component unmounts
                dispatch(disconnectFeedOrders());
            };
    }, [dispatch]);

    const {orders, total, totalToday} = useSelector(
        (state) => state.ordersFeed);

    const ingredientsMap = useSelector(selectIngredientsMap);

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
                <section className={styles[`feed-section`]}>
                    <ul className={`${styles[`orders-list`]} custom-scroll`}>
                        {orders.map(order => (
                            <li key={order.number}>
                                <Link
                                    key={order.number}
                                    to={`/feed/${order.number}`}
                                    // сохраняем в свойство background роут,
                                    // на котором была открыта наша модалка
                                    state={{background: location}}
                                    onClick={() => {
                                        openOrderModal(order)
                                    }}
                                    className={styles.order}
                                >

                                    <div className={styles.date}>
                                        <p className="text text_type_digits-default">{`#${order.number}`}</p>
                                        <div>
                                            <FormattedDate date={new Date(order.createdAt)}
                                                           className="text text_type_main-default text_color_inactive"/>
                                            <span
                                                className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
                                        </div>
                                    </div>
                                    <h3 className="text text_type_main-medium">{order.name}</h3>
                                    <div className={styles.summary}>
                                        <ul className={styles.ingredients}>
                                            {order.ingredients.slice(0, 5).map((ingredientId, index) => (
                                                ingredientsMap[ingredientId] ? (
                                                    <li key={index} className={styles.ingredient}>
                                                        <img className={styles[`ingredient-img`]}
                                                             src={ingredientsMap[ingredientId].image_mobile}
                                                             alt={ingredientsMap[ingredientId].alt}/>
                                                    </li>
                                                ) : null
                                            ))}

                                            {order.ingredients.length > 5 && (
                                                <li className={styles.ingredient}>
                                                    <img
                                                        className={`${styles['ingredient-img']} ${styles['fifth-ingredient-img']}`}
                                                        src={ingredientsMap[order.ingredients[5]].image_mobile}
                                                        alt={ingredientsMap[order.ingredients[5]].alt}/>
                                                    <span
                                                        className={`${styles[`hidden-ingredient`]} text text_type_main-default`}>
                                                +{order.ingredients.length - 5}
                                            </span>
                                                </li>
                                            )}
                                        </ul>

                                        <div className={styles.total}>
                                            <span
                                                className="text text_type_digits-default">{getIngredientsTotalPrice(order, ingredientsMap)}</span>
                                            <CurrencyIcon type="primary"/>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </section>

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