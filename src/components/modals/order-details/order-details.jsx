import {useSelector} from "react-redux";
import {selectOrderDetails} from '../../../services/order-details/selector';
import styles from './order-details.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientCount, getIngredientsTotalPrice} from "../../../utils/ingredients-details";
import {selectIngredientsMap} from "../../../services/burger-ingredients/selector";

const OrderDetails = () => {
    const order = useSelector(selectOrderDetails);

    const ingredientsMap = useSelector(selectIngredientsMap);

    const orderStatus = order.status === 'done' ? 'Выполнен' : 'В процессе';

    return (
        <div className={styles.order}>
            <p className={`${styles[`order-number`]} text text_type_digits-default`}>{`#${order.number}`}</p>
            <h2 className="text text_type_main-medium">{order.name}</h2>
            <p className={`${styles[`order-status`]} text text_type_main-default`}>{orderStatus}</p>
            <p className="text text_type_main-medium">Состав:</p>

            <ul className={`${styles[`ingredients-list`]} custom-scroll`}>
                {order.ingredients.map((ingredientId, index) => (
                    ingredientsMap[ingredientId] ? (
                        <li key={index} className={styles.ingredient}>
                            <div className={styles[`ingredient-name`]}>
                                <div className={styles[`img-wrapper`]}>
                                    <img className={styles[`ingredient-img`]}
                                         src={ingredientsMap[ingredientId].image_mobile}
                                         alt={ingredientsMap[ingredientId].alt}/>
                                </div>
                                <h3 className="text text_type_main-default">{ingredientsMap[ingredientId].name}</h3>
                            </div>
                            <div className={styles[`ingredient-price`]}>
                                <span className="text text_type_digits-default">{getIngredientCount(ingredientId, order)}</span>
                                <span className="text text_type_digits-default">x</span>
                                <span className="text text_type_digits-default">{ingredientsMap[ingredientId].price}</span>
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
                    <span className="text text_type_digits-default">{getIngredientsTotalPrice(order, ingredientsMap)}</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;