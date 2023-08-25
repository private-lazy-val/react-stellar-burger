import React, { useState, useRef } from 'react';
import styles from "./burger-ingredients.module.css";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerIngredients = ({data, addIngredientToCart}) => {

    const [current, setCurrent] = useState('Булки');

    const categorizedItems = {
        'Булки': data.filter(item => item.type === 'bun'),
        'Соусы': data.filter(item => item.type === 'sauce'),
        'Начинки': data.filter(item => item.type === 'main'),
    };

    const refs = {
        'Булки': useRef(null),
        'Соусы': useRef(null),
        'Начинки': useRef(null),
    };

    const handleTabClick = (tab) => {
        setCurrent(tab);
        refs[tab].current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                {Object.keys(categorizedItems).map(category => (
                    <Tab key={category} value={category} active={current === category} onClick={() => handleTabClick(category)}>
                        {category}
                    </Tab>
                ))}
            </div>

            <ul className={`${styles['create-burger']} pt-10 custom-scroll`}>
                {Object.entries(categorizedItems).map(([category, ingredients]) => (
                    <li key={category} ref={refs[category]}>
                        <h2 className="text text_type_main-medium">{category}</h2>
                        <ul className={`${styles.ingredients} mb-10 mt-6 ml-4`}>
                            {ingredients.map(({_id, type, name, price, image}) => (
                                <li
                                    key={_id}
                                    className={styles.ingredient}
                                    onClick={() => addIngredientToCart({_id, type, name, price, image})}
                                >
                                    <Counter count={1} size="default" extraClass="m-1" />
                                    <img src={image} alt={name} width="240" height="120"/>
                                    <div className={styles.price}>
                                        <span className="text text_type_digits-default">{price}</span>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                    <span className="text text_type_main-default">{name}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.exact({
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
    addIngredientToCart: PropTypes.func.isRequired,
};

export default BurgerIngredients;