import {getIngredientsMap} from "../../services/burger-ingredients/selector";
import {Link, useLocation} from "react-router-dom";
import useModal from "../../hooks/use-modal";
import styles from "./orders.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientsTotalPrice, getIngredientCount, getUnique} from "../../utils/ingredients-info";
import {useBasePath} from "../../hooks/use-base-path";
import {validateOrder, validateOrderIngredients} from "../../utils/validate-orders-payload";
import React, {useMemo} from "react";
import {useSelector} from "../../services/store";
import {BaseIngredient, Order} from "../../utils/types";


type OrdersProps = {
    orders: Order[]
}

type OrderWithTotalAndIngredients = Order & {
    ingredients: BaseIngredient[];
    total: number;
};

const Orders = React.memo(({orders}: OrdersProps): React.JSX.Element => {
    const location = useLocation();

    const {
        openOrderModal
    } = useModal();

    const basePath = useBasePath();

    const {allIngredients} = useSelector(getIngredientsMap);

    const validOrdersWithTotalPriceAndUniqueIngredients = useMemo<OrderWithTotalAndIngredients[]>(() => {
        return orders.map(order => {
            if (validateOrder(order)) {
                const validIngredientIds = validateOrderIngredients(order, allIngredients);
                if(validIngredientIds.length > 0) {
                    const uniqueIngredients = getUnique(validIngredientIds);
                    const ingredientCount = getIngredientCount(order);
                    const totalPrice = getIngredientsTotalPrice(ingredientCount, allIngredients);
                    return { ...order,  ingredients: uniqueIngredients, total: totalPrice };
                }
            }
            return null;
        }).filter(order => order !== null) as OrderWithTotalAndIngredients[]; // Filter out the null entries
    }, [orders, allIngredients]);

    return (
        <section className={styles[`feed-section`]}>
            <ul className={`${styles[`orders-list`]} custom-scroll`}>
                {validOrdersWithTotalPriceAndUniqueIngredients.map(order => (
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
                                    {order.ingredients
                                        .slice(0, 5).map((ingredientId, index) => (
                                            <li key={index} className={styles.ingredient}>
                                                <img className={styles[`ingredient-img`]}
                                                     src={allIngredients[ingredientId].image_mobile}
                                                     alt={allIngredients[ingredientId].alt}/>
                                            </li>
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
                                                className="text text_type_digits-default">{order.total}</span>
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

export default Orders;