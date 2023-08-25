import React from 'react';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";

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
                        {ingredients.map(({name, price, image, _id}) => (
                            <li key={_id} className={styles.item}>
                                <DragIcon type="primary"/>
                                <ConstructorElement text={name} price={price} thumbnail={image} />
                            </li>
                        ))}
                    </ul>
                </li>

                {bun &&
                    <li style={{marginLeft: '48px'}}><ConstructorElement type="bottom" isLocked={true} text={bun.name}
                                                                         price={bun.price}
                                                                         thumbnail={bun.image}/></li>}
            </ul>

            <div className={styles.checkout}>
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

export default BurgerConstructor;