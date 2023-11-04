import styles from "./orders-feed.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchAllOrders} from "../../services/ordersFeed/ordersFeedSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {
    selectAllOrders,
    selectTodayTotalOrders,
    selectTotalOrders
} from "../../services/ordersFeed/selector";
import {getIngredientsTotalPrice, ingredientsDetails} from "../../utils/ingredients-details";
import useModal from "../../hooks/useModal";
import {Link, useLocation} from "react-router-dom";

const OrdersFeed = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        openOrderModal
    } = useModal();

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const {orders, totalOrders, totalTodayOrders} = useSelector(state => ({
        orders: selectAllOrders(state),
        totalOrders: selectTotalOrders(state),
        totalTodayOrders: selectTodayTotalOrders(state)
    }));

    const lastTwentyReadyOrdersIds = useMemo(() => {
        return orders.filter(order => order.status === 'done').map(order => order.number).slice(-10);
    }, [orders]);

    const lastTwentyInProgressOrdersIds = useMemo(() => {
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
                                                ingredientsDetails[ingredientId] ? (
                                                    <li key={index} className={styles.ingredient}>
                                                        <img className={styles[`ingredient-img`]}
                                                             src={ingredientsDetails[ingredientId].url}
                                                             alt={ingredientsDetails[ingredientId].alt}/>
                                                    </li>
                                                ) : null
                                            ))}

                                            {order.ingredients.length > 5 && (
                                                <li className={styles.ingredient}>
                                                    <img
                                                        className={`${styles['ingredient-img']} ${styles['fifth-ingredient-img']}`}
                                                        src={ingredientsDetails[order.ingredients[5]].url}
                                                        alt={ingredientsDetails[order.ingredients[5]].alt}/>
                                                    <span
                                                        className={`${styles[`hidden-ingredient`]} text text_type_main-default`}>
                                                +{order.ingredients.length - 5}
                                            </span>
                                                </li>
                                            )}
                                        </ul>

                                        <div className={styles.total}>
                                            <span
                                                className="text text_type_digits-default">{getIngredientsTotalPrice(order)}</span>
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
                                {lastTwentyReadyOrdersIds.map(order =>
                                    <li key={order}
                                        className={`${styles[`order-ready-item`]} text text_type_digits-default`}>{order}</li>
                                )}
                            </ul>
                        </div>
                        <div className={styles[`orders-inprogress`]}>
                            <h2 className={`${styles[`header-in-progress`]} text text_type_main-medium`}>В работе:</h2>
                            <ul className={styles[`orders-list`]}>
                                {lastTwentyInProgressOrdersIds.map(order =>
                                    <li key={order}
                                        className={`${styles[`order-inprogress-item`]} text text_type_digits-default`}>{order}</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                        <p className={`${styles[`total-orders`]} text text_type_digits-large`}>{totalOrders}</p>
                    </div>
                    <div>
                        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                        <p className={`${styles[`total-orders`]} text text_type_digits-large`}>{totalTodayOrders}</p>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default OrdersFeed;