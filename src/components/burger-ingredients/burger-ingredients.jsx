import React from 'react';
import styles from "./burger-ingredients.module.css";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({data, addIngredientToCart}) => {
    const [current, setCurrent] = React.useState('Булки');

    const categorizedItems = {
        'Булки': data.filter(item => item.type === 'bun'),
        'Соусы': data.filter(item => item.type === 'sauce'),
        'Начинки': data.filter(item => item.type === 'main'),
    };

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                {Object.keys(categorizedItems).map(category => (
                    <Tab key={category} value={category} active={current === category} onClick={setCurrent}>
                        {category}
                    </Tab>
                ))}
            </div>

            <ul className={`${styles['create-burger']} pt-10 custom-scroll`}>
                {Object.entries(categorizedItems).map(([category, ingredients]) => (
                    <li key={category}>
                        <h2 className="text text_type_main-medium">{category}</h2>
                        <ul className={`${styles.ingredients} mb-10 mt-6`}>
                            {ingredients.map(({_id, type, name, price, image}) => (
                                <li
                                    key={_id}
                                    className={styles.ingredient}
                                    onClick={() => addIngredientToCart({_id, type, name, price, image})}
                                >
                                    <Counter count={1} size="default"/>
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

export default BurgerIngredients;