import styles from './order-info.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientCount, getIngredientsTotalPrice} from "../../../utils/ingredients-info";
import {
    getIngredientsMap
} from "../../../services/burger-ingredients/selector";
import {useParams} from "react-router-dom";
import {fetchOrder} from "../../../services/order-info/order-info-slice";
import React, {useEffect, useMemo} from "react";
import LoadingComponent from "../../../utils/loading-component";
import {getOrder, selectOrderError, selectOrderStatus} from "../../../services/order-info/selector";
import {useSelector, useDispatch} from "../../../services/store";
import {AsyncThunkStatuses} from "../../../enums";

const OrderInfo = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const {number} = useParams<{ number: string }>();

    const {allIngredients, orderFetchStatus, orderFetchError} = useSelector(state => {
        const {allIngredients} = getIngredientsMap(state);
        return {
            allIngredients,
            orderFetchStatus: selectOrderStatus(state),
            orderFetchError: selectOrderError(state)
        }
    });

    const order = useSelector(getOrder(+number!));

    useEffect(() => {
        if (!order && number) {
            dispatch(fetchOrder(number))
        }
    }, [dispatch, number, order]);

    const orderStatus = order?.status === 'done' ? 'Выполнен' : 'В процессе';

    const ingredientCount = useMemo(() => order ? getIngredientCount(order) : {}, [order]);

    let content;

    if (orderFetchStatus === AsyncThunkStatuses.loading) {
        content = <div className="modal-backdrop"><LoadingComponent/></div>
    } else if (orderFetchStatus === AsyncThunkStatuses.failed) {
        content = <div className="modal-backdrop text_type_digits-medium">{orderFetchError}</div>
    } else if ((orderFetchStatus === AsyncThunkStatuses.succeeded && order) || order) {
        content = (
            <div className={styles.container}>
                <p className={`${styles[`order-number`]} text text_type_digits-default`}>{`#${number}`}</p>
                <h2 className="text text_type_main-medium">{order.name}</h2>
                <p className={`${styles[`order-status`]} text text_type_main-default`}>{orderStatus}</p>
                <p className="text text_type_main-medium">Состав:</p>

                <ul className={`${styles[`ingredients-list`]} custom-scroll`}>
                    {
                        Object.entries(ingredientCount)
                            .filter(([ingredientId, _]) => ingredientId in allIngredients)
                            .map(([ingredientId, count]) => (
                                <li key={ingredientId} className={styles.ingredient}>
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
                                    className="text text_type_digits-default">{count}</span>
                                        <span className="text text_type_digits-default">x</span>
                                        <span
                                            className="text text_type_digits-default">{allIngredients[ingredientId].price}</span>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                </li>

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
                        className="text text_type_digits-default">{getIngredientsTotalPrice(ingredientCount, allIngredients)}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {content}
        </>
    );
};

export default OrderInfo;