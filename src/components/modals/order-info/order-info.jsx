import {useDispatch, useSelector} from "react-redux";
import styles from './order-info.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientCount, getIngredientsTotalPrice} from "../../../utils/ingredients-info";
import {selectIngredientsMap} from "../../../services/burger-ingredients/selector";
import {useParams} from "react-router-dom";
import {fetchOrder} from "../../../services/order-info/order-info-slice";
import {useEffect, useMemo} from "react";
import LoadingComponent from "../../../utils/loading-component";

const OrderInfo = () => {
    const dispatch = useDispatch();
    const {number} = useParams();
    const allIngredients = useSelector(selectIngredientsMap);

    // 'isLoaded' is used to track if the ingredients have been loaded
    const isLoaded = useMemo(() => Object.keys(allIngredients).length > 0, [allIngredients]);

    let order = useSelector(state => {
        // Check in allOrdersMap
        console.log(state.ordersFeed)
        let order = state.ordersFeed.ordersMap?.[number];
        if (order) {
            return order;
        }
        // Check in profileOrders
        order = state.profileOrders.ordersMap?.[number];
        console.log(state.profileOrders)
        if (order) {
            return order;
        }
        // Finally, check in the current order details
        return state.orderInfo.order && state.orderInfo.order?.number === number
            ? state.orderInfo.order
            : undefined;
    })

    useEffect(() => {
        if (isLoaded && order === undefined) {
            dispatch(fetchOrder(number))
        }
    }, [number, dispatch, order, isLoaded]);

    if (!isLoaded || !order) {
        // Render loading state or null if the data isn't ready
        return <div className={styles.backdrop}><LoadingComponent/></div>;
    }

    const orderStatus = order.status === 'done' ? 'Выполнен' : 'В процессе';

    return (
        order && (
            <div className={styles.order}>
                <p className={`${styles[`order-number`]} text text_type_digits-default`}>{`#${number}`}</p>
                <h2 className="text text_type_main-medium">{order.name}</h2>
                <p className={`${styles[`order-status`]} text text_type_main-default`}>{orderStatus}</p>
                <p className="text text_type_main-medium">Состав:</p>

                <ul className={`${styles[`ingredients-list`]} custom-scroll`}>
                    {order.ingredients.map((ingredientId, index) => (
                        allIngredients[ingredientId] ? (
                            <li key={index} className={styles.ingredient}>
                                <div className={styles[`ingredient-name`]}>
                                    <div className={styles[`img-wrapper`]}>
                                        <img className={styles[`ingredient-img`]}
                                             src={allIngredients[ingredientId].image_mobile}
                                             alt={allIngredients[ingredientId].alt}/>
                                    </div>
                                    <h3 className="text text_type_main-default">{allIngredients[ingredientId].name}</h3>
                                </div>
                                <div className={styles[`ingredient-price`]}>
                                <span
                                    className="text text_type_digits-default">{getIngredientCount(ingredientId, order)}</span>
                                    <span className="text text_type_digits-default">x</span>
                                    <span
                                        className="text text_type_digits-default">{allIngredients[ingredientId].price}</span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </li>
                        ) : null
                    ))}
                </ul>

                <div className={styles.summary}>
                    <div>
                        <FormattedDate date={new Date(order.createdAt)}
                                       className="text text_type_main-default text_color_inactive"/>
                        <span
                            className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
                    </div>
                    <div className={styles.total}>
                    <span
                        className="text text_type_digits-default">{getIngredientsTotalPrice(order, allIngredients)}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        )
    );
};

export default OrderInfo;