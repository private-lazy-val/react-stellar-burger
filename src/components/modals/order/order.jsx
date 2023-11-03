import {useSelector} from "react-redux";
import {selectOrderDetails} from '../../../services/orderDetails/selector';
import styles from './order.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getIngredientCount, getIngredientsTotalPrice, ingredientsDetails} from "../../../utils/ingredients-details";

const Order = () => {
    const order = useSelector(selectOrderDetails);

    const orderStatus = order.status === 'done' ? 'Выполнен' : 'В процессе';

    return (
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
    );
};

export default Order;