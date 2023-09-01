import React from "react";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import ingredientPropType from "../../utils/prop-types";

const BurgerConstructor =  React.memo(({bun, ingredients, openModal}) => {

    // Calculate total price
    const totalPrice = ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) + (bun ? bun.price * 2 : 0);

    return (
        <section className={`${styles.section} mt-15`}>
            <ul className={styles['outer-list']}>
                {bun && <li className={styles.bun}><ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`}
                                                                             price={bun.price}
                                                                             thumbnail={bun.image}/></li>}
                <li>
                    <ul className={`${styles['inner-list']} custom-scroll`}>
                        {ingredients.map((ingredient) => (
                            <li key={ingredient.uuid} className={styles.item}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
                            </li>
                        ))}
                    </ul>
                </li>

                {bun &&
                    <li className={styles.bun}><ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`}
                                                                         price={bun.price}
                                                                         thumbnail={bun.image}/></li>}
            </ul>

            <div className={`${styles.checkout} mr-4 mt-10`}>
                <div className={styles.total}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
});

BurgerConstructor.propTypes = {
    bun: ingredientPropType,
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
    openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;