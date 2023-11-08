import {useSelector} from "react-redux";
import {getIngredients} from "../../services/burger-ingredients/selector";
import {Link, useLocation} from "react-router-dom";
import useModal from "../../hooks/use-modal";
import styles from "./orders.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientsTotalPrice} from "../../utils/ingredients-info";
import PropTypes from "prop-types";
import {useBasePath} from "../../hooks/use-base-path";
import {validateOrder, validateOrderIngredients} from "../../utils/validate-orders-payload";
import React, {useMemo} from "react";

const Orders = React.memo(({orders}) => {
    const location = useLocation();

    const {
        openOrderModal
    } = useModal();

    const basePath = useBasePath();

    const {allIngredients} = useSelector(getIngredients);

    const validOrders = useMemo(() => {
        return orders.map(order => {
            if (validateOrder(order)) {
                const validIngredientIds = validateOrderIngredients(order, allIngredients);
                if(validIngredientIds.length > 0) {
                    return {...order, ingredients: validIngredientIds};
                }
            }
            return null;
        }).filter(order => order !== null); // Filter out the null entries
    }, [orders, allIngredients]);

    return (
        <section className={styles[`feed-section`]}>
            <ul className={`${styles[`orders-list`]} custom-scroll`}>
                {validOrders.map(order => (
                    <li key={order.number}>
                        <Link
                            key={order.number}
                            to={`${basePath}/${order.number}`}
                            // сохраняем в свойство background роут,
                            // на котором была открыта наша модалка
                            state={{background: location}}
                            onClick={() => {
                                openOrderModal()
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
                                        allIngredients[ingredientId] ? (
                                            <li key={index} className={styles.ingredient}>
                                                <img className={styles[`ingredient-img`]}
                                                     src={allIngredients[ingredientId].image_mobile}
                                                     alt={allIngredients[ingredientId].alt}/>
                                            </li>
                                        ) : null
                                    ))}

                                    {order.ingredients.length > 5 && (
                                        <li className={styles.ingredient}>
                                            <img
                                                className={`${styles['ingredient-img']} ${styles['fifth-ingredient-img']}`}
                                                src={allIngredients[order.ingredients[5]].image_mobile}
                                                alt={allIngredients[order.ingredients[5]].alt}/>
                                            <span
                                                className={`${styles[`hidden-ingredient`]} text text_type_main-default`}>
                                                +{order.ingredients.length - 5}
                                            </span>
                                        </li>
                                    )}
                                </ul>

                                <div className={styles.total}>
                                            <span
                                                className="text text_type_digits-default">{getIngredientsTotalPrice(order, allIngredients)}</span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
});

Orders.propTypes = {
    orders: PropTypes.array.isRequired
};

export default Orders;