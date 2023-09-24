import React, {useContext} from "react";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import {ConstructorContext} from "../../services/contexts/constructorContext";
import {OrderDetailsContext} from "../../services/contexts/orderDetailsContext";
import api from "../../api/api";

const BurgerConstructor = React.memo(({openModal}) => {
    const {bun, ingredients, state} = useContext(ConstructorContext);
    const totalPrice = state.total;

    const {setOrderId, setIdIsLoading, setIdError} = useContext(OrderDetailsContext);

    const submitOrder = async (e) => {
        e.preventDefault();
        const newOrder = {
            ingredients: [bun._id, ...ingredients.map(ingredient => ingredient._id), bun._id]
        }
        try {
            const response = await api.post('/orders', newOrder);
            const jsonResponse = response.data;

            if (jsonResponse.success && jsonResponse.order.number) {
                setOrderId(jsonResponse.order.number);
            } else {
                throw new Error('The \'number\' field is missing or empty.'); // Will be caught by catch block
            }
        } catch (err) {
            setIdError(true);
            console.log('Error occurred:', err); // Log the entire error object for more details
        } finally {
            setIdIsLoading(false);
        }
    };

    const handleOrder = (e) => {
        if (bun && ingredients.length !== 0) {
            openModal();
            submitOrder(e);
        }
    };

    return (
        <section className={`${styles.section} mt-15`}>
            <ul className={styles['outer-list']}>
                {bun && <li className={styles.bun}><ConstructorElement type="top" isLocked={true}
                                                                       text={`${bun.name} (верх)`}
                                                                       price={bun.price}
                                                                       thumbnail={bun.image}/></li>}
                <li>
                    <ul className={`${styles['inner-list']} custom-scroll`}>
                        {ingredients.map((ingredient) => (
                            <li key={ingredient.uuid} className={styles.item}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={ingredient.name} price={ingredient.price}
                                                    thumbnail={ingredient.image}/>
                            </li>
                        ))}
                    </ul>
                </li>

                {bun &&
                    <li className={styles.bun}><ConstructorElement type="bottom" isLocked={true}
                                                                   text={`${bun.name} (низ)`}
                                                                   price={bun.price}
                                                                   thumbnail={bun.image}/></li>}
            </ul>

            <div className={`${styles.checkout} mr-4 mt-10`}>
                <div className={styles.total}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleOrder}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
});

BurgerConstructor.propTypes = {
    openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;