import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchOrder} from "../../services/order-details/order-details-slice";
import {selectHasErrorOrder, selectIsLoadingOrder, selectOrderDetails} from "../../services/order-details/selector";
import {getIngredientCount, getIngredientsTotalPrice} from "../../utils/ingredients-details";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import useLoadingAndErrorHandling from "../../hooks/use-loading-and-error-handling";
import LoadingComponent from "../../utils/loading-component";
import ErrorComponent from "../../utils/error-component";
import styles from './order-page.module.css';
import commonStyles from '../../components/modals/order-details/order-details.module.css';
import {selectIngredientsMap} from "../../services/burger-ingredients/selector";

const OrderPage = () => {
    const {isLoading, hasError} = useLoadingAndErrorHandling(selectIsLoadingOrder, selectHasErrorOrder);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {number} = useParams();

    useEffect(() => {
        dispatch(fetchOrder(number))
            .then(response => {
                const fetchedOrder = response.payload;
                if(!fetchedOrder) {
                    navigate("/missing", {replace: true});
                }
            })
    }, [number, dispatch, navigate]);

    const order = useSelector(selectOrderDetails);

    const ingredientsMap = useSelector(selectIngredientsMap);

    const orderStatus = order?.status === 'done' ? 'Выполнен' : 'В процессе';

    if (isLoading) {
        return <div className={styles.backdrop}><LoadingComponent/></div>;
    }

    if (!isLoading && hasError) {
        return <div className={styles.error}><ErrorComponent/></div>;
    }

    return (
        order && (
            <div className={styles.order}>
                <p className={`${commonStyles[`order-number`]} text text_type_digits-default`}>{`#${order.number}`}</p>
                <h2 className="text text_type_main-medium">{order.name}</h2>
                <p className={`${commonStyles[`order-status`]} text text_type_main-default`}>{orderStatus}</p>
                <p className="text text_type_main-medium">Состав:</p>

                <ul className={`${commonStyles[`ingredients-list`]} custom-scroll`}>
                    {order.ingredients.map((ingredientId, index) => (
                        ingredientsMap[ingredientId] ? (
                            <li key={index} className={commonStyles.ingredient}>
                                <div className={commonStyles[`ingredient-name`]}>
                                    <div className={commonStyles[`img-wrapper`]}>
                                        <img className={commonStyles[`ingredient-img`]}
                                             src={ingredientsMap[ingredientId].image_mobile}
                                             alt={ingredientsMap[ingredientId].alt}/>
                                    </div>
                                    <h3 className="text text_type_main-default">{ingredientsMap[ingredientId].name}</h3>
                                </div>
                                <div className={commonStyles[`ingredient-price`]}>
                                    <span className="text text_type_digits-default">{getIngredientCount(ingredientId, order)}</span>
                                    <span className="text text_type_digits-default">x</span>
                                    <span className="text text_type_digits-default">{ingredientsMap[ingredientId].price}</span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </li>
                        ) : null
                    ))}
                </ul>

                <div className={commonStyles.summary}>
                    <div>
                        <FormattedDate date={new Date(order.createdAt)}
                                       className="text text_type_main-default text_color_inactive"/>
                        <span
                            className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
                    </div>
                    <div className={commonStyles.total}>
                        <span className="text text_type_digits-default">{getIngredientsTotalPrice(order, ingredientsMap)}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        ));
};

export default OrderPage;