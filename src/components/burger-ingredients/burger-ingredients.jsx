import React from 'react';
import styles from "./burger-ingredients.module.css";
import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({data, addIngredientToCart}) => {
    const [current, setCurrent] = React.useState('Булки');

    const buns = data.filter((ingredient) => ingredient.type === "bun");
    const sauces = data.filter((ingredient) => ingredient.type === "sauce");
    const mains = data.filter((ingredient) => ingredient.type === "main");

    const addIngredient = (ingredients) => {
        return ingredients.map((ingredient) => (
            <li
                key={ingredient._id}
                className={styles.ingredient}
                onClick={() => addIngredientToCart(ingredient)}
                style={{display: 'flex', flexDirection: 'column'}}
            >
                <Counter count={1} size="default"/>
                <img src={ingredient.image} alt={ingredient.name} width="240" height="120"/>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <span className="text text_type_digits-default">{ingredient.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <span className="text text_type_main-default">{ingredient.name}</span>
            </li>
        ))
    }

    return (
        <section>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <ul className={`${styles['create-burger']} pt-10 custom-scroll`}>
                <li>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <ul className={`${styles.ingredients} mb-10 mt-6 ml-4`}>
                        {addIngredient(buns)}
                    </ul>
                </li>
                <li>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <ul className={`${styles.ingredients} mb-10 mt-6 ml-4`}>
                        {addIngredient(sauces)}
                    </ul>
                </li>
                <li>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <ul className={`${styles.ingredients} mb-10 mt-6 ml-4`}>
                        {addIngredient(mains)}
                    </ul>
                </li>
            </ul>
        </section>
    );
};

export default BurgerIngredients;