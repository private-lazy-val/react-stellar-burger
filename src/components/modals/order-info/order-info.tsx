import styles from './order-info.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientCount, getIngredientsTotalPrice} from "../../../utils/ingredients-info";
import {
    getIngredients
} from "../../../services/burger-ingredients/selector";
import {useParams} from "react-router-dom";
import {fetchOrder} from "../../../services/order-info/order-info-slice";
import React, {useEffect, useMemo} from "react";
import LoadingComponent from "../../../utils/loading-component";
import {getOrder, selectOrderError, selectOrderStatus} from "../../../services/order-info/selector";
import {useAppDispatch, useAppSelector} from "../../../services/redux-hooks";

const OrderInfo = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const {number} = useParams<{ number: string }>();

    const {allIngredients, orderFetchStatus, orderFetchError} = useAppSelector(state => {
        const {allIngredients} = getIngredients(state);
        return {
            allIngredients,
            orderFetchStatus: selectOrderStatus(state),
            orderFetchError: selectOrderError(state)
        }
    });

    const order = useAppSelector(getOrder(number));

    useEffect(() => {
        if (!order) {
            dispatch(fetchOrder(number))
        }
    }, [dispatch, number, order]);

    const orderStatus = order?.status === 'done' ? 'Выполнен' : 'В процессе';

    const ingredientCount = useMemo(() => getIngredientCount(order), [order]);

    let content;

    if (orderFetchStatus === 'loading') {
        content = <div className="modal-backdrop"><LoadingComponent/></div>
    } else if (orderFetchStatus === 'failed' && orderFetchStatus !== 'loading') {
        content = <div className="modal-backdrop text_type_digits-medium">{orderFetchError}</div>
    } else if ((orderFetchStatus === 'succeeded' && order) || order) {
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