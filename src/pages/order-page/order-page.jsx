import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchOrderDetails} from "../../services/orderDetails/orderDetailsSlice";
import {selectHasErrorOrder, selectIsLoadingOrder, selectOrderDetails} from "../../services/orderDetails/selector";
import {getIngredientCount, getIngredientsTotalPrice, ingredientsDetails} from "../../utils/ingredients-details";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import useLoadingAndErrorHandling from "../../hooks/useLoadingAndErrorHandling";
import LoadingComponent from "../../utils/loading-component";
import ErrorComponent from "../../utils/error-component";
import styles from './order-page.module.css';
import {loadAllIngredients} from "../../services/burgerIngredients/burgerIngredientsSlice";

const OrderPage = () => {
    const {isLoading, hasError} = useLoadingAndErrorHandling(selectIsLoadingOrder, selectHasErrorOrder);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {orderId} = useParams();
    const order = useSelector(selectOrderDetails);

    useEffect(() => {
        dispatch(fetchOrderDetails(orderId))
            .then(response => {
                const fetchedOrder = response.payload;
                if(!fetchedOrder) {
                    navigate("/missing", {replace: true});
                }
            })
    }, [orderId, dispatch, navigate]);

    const orderStatus = order?.status === 'done' ? 'Выполнен' : 'В процессе';

    if (isLoading) {
        return <div className={styles.backdrop}><LoadingComponent/></div>;
    }

    if (!isLoading && hasError) {
        return <div className={styles.error}><ErrorComponent/></div>;
    }

    return (
        order && (
            <div>
                <p className="text text_type_digits-default">{`#${order.number}`}</p>
                <h2 className="text text_type_main-medium">{order.name}</h2>
                <p className={`${styles[`order-status`]} text text_type_main-default`}>{orderStatus}</p>
                <p className="text text_type_main-medium">Состав:</p>

                <ul className={`${styles[`ingredients-list`]} custom-scroll`}>
                    {order.ingredients.map((ingredientId, index) => (
                        ingredientsDetails[ingredientId] ? (
                            <li key={index} className={styles.ingredient}>
                                <div>
                                    <img className={styles[`ingredient-img`]}
                                         src={ingredientsDetails[ingredientId].url}
                                         alt={ingredientsDetails[ingredientId].alt}/>
                                    <h3>{ingredientsDetails[ingredientId].alt}</h3>
                                </div>
                                <div>
                                    <span>{getIngredientCount(ingredientId, order)}</span>
                                    <span>X</span>
                                    <span>{ingredientsDetails[ingredientId].price}</span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </li>
                        ) : null
                    ))}
                </ul>

                <div>
                    <div>
                        <FormattedDate date={new Date(order.createdAt)}
                                       className="text text_type_main-default text_color_inactive"/>
                        <span
                            className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
                    </div>
                    <div className={styles.total}>
                        <span className="text text_type_digits-default">{getIngredientsTotalPrice(order)}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        ));
};

export default OrderPage;