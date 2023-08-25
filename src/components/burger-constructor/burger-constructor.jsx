import React from 'react';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';

const BurgerConstructor = ({bun, ingredients}) => {

    // Calculate total price
    const totalPrice = ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) + (bun ? bun.price * 2 : 0);

    return (
        <section className={`${styles.section} mt-15`}>
            <ul className={styles['outer-list']}>
                {bun && <li style={{marginLeft: '48px'}}><ConstructorElement type="top" isLocked={true} text={bun.name}
                                                                             price={bun.price}
                                                                             thumbnail={bun.image}/></li>}
                <li>
                    <ul className={`${styles['inner-list']} custom-scroll`}>
                        {ingredients.map((ingredient) => (
                            <li key={ingredient._id} className={styles.item}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
                            </li>
                        ))}
                    </ul>
                </li>

                {bun &&
                    <li style={{marginLeft: '48px'}}><ConstructorElement type="bottom" isLocked={true} text={bun.name}
                                                                         price={bun.price}
                                                                         thumbnail={bun.image}/></li>}
            </ul>

            <div className={`${styles.checkout} mr-4 mt-10`}>
                <div className={styles.total}>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    bun: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }),
    ingredients: PropTypes.arrayOf(PropTypes.exact({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    })).isRequired,
};

export default BurgerConstructor;