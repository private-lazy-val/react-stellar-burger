import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchOrder} from "../../services/order-info/order-info-slice";
import {selectOrderStatus, selectOrder, selectOrderError} from "../../services/order-info/selector";
import {getIngredientCount, getIngredientsTotalPrice} from "../../utils/ingredients-info";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import LoadingComponent from "../../utils/loading-component";
import styles from './order-page.module.css';
import commonStyles from '../../components/modals/order-info/order-info.module.css';
import {selectIngredientsMap} from "../../services/burger-ingredients/selector";
import ItemNotFound from "../../utils/item-not-found";
import {useDelayedLoader} from "../../hooks/use-delayed-loader";

const OrderPage = () => {
    const dispatch = useDispatch();

    const {number} = useParams();
    const {allIngredients, orderFetchStatus, orderFetchError} = useSelector(state => ({
        allIngredients: selectIngredientsMap(state),
        orderFetchStatus: selectOrderStatus(state),
        orderFetchError: selectOrderError(state)
    }));

    const isLoading = orderFetchStatus === 'loading';
    const showLoader = useDelayedLoader(isLoading, 300);

    useEffect(() => {
        dispatch(fetchOrder(number))
    }, [number, dispatch]);

    const order = useSelector(selectOrder);

    const orderStatus = order?.status === 'done' ? 'Выполнен' : 'В процессе';

    let content;

    if (showLoader) {
        content = <div className="page-backdrop"><LoadingComponent/></div>
    } else if (orderFetchStatus === 'failed' && !showLoader) {
        content = <div className="page-backdrop text_type_digits-medium">{orderFetchError}</div>
    } else if (orderFetchStatus === 'succeeded' && order) {
        content = (
            <>
                <p className={`${commonStyles[`order-number`]} text text_type_digits-default`}>{`#${order.number}`}</p>
                <h2 className="text text_type_main-medium">{order.name}</h2>
                <p className={`${commonStyles[`order-status`]} text text_type_main-default`}>{orderStatus}</p>
                <p className="text text_type_main-medium">Состав:</p>

                <ul className={`${commonStyles[`ingredients-list`]} custom-scroll`}>
                    {order.ingredients.map((ingredientId, index) => (
                        allIngredients[ingredientId] ? (
                            <li key={index} className={commonStyles.ingredient}>
                                <div className={commonStyles[`ingredient-name`]}>
                                    <div className={commonStyles[`img-wrapper`]}>
                                        <img className={commonStyles[`ingredient-img`]}
                                             src={allIngredients[ingredientId].image_mobile}
                                             alt={allIngredients[ingredientId].alt}/>
                                    </div>
                                    <h3 className="text text_type_main-default">{allIngredients[ingredientId].name}</h3>
                                </div>
                                <div className={commonStyles[`ingredient-price`]}>
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

                <div className={commonStyles.summary}>
                    <div>
                        <FormattedDate date={new Date(order.createdAt)}
                                       className="text text_type_main-default text_color_inactive"/>
                        <span
                            className="text text_type_main-default text_color_inactive">&nbsp;i-GMT+3</span>
                    </div>
                    <div className={commonStyles.total}>
                        <span
                            className="text text_type_digits-default">{getIngredientsTotalPrice(order, allIngredients)}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </>
        )
    }

    if (!order && orderFetchStatus === 'succeeded') {
        content = <div className='page-backdrop'><ItemNotFound/></div>
    }

    return (
        <div className={styles.container}>
            {content}
        </div>

    );
};

export default OrderPage;