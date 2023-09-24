import React, {useState, useRef, useMemo, useContext} from "react";
import styles from "./burger-ingredients.module.css";
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {IngredientsContext} from "../../services/contexts/ingredientsContext";

const BurgerIngredients = React.memo(({openModal}) => {

    const { items, isLoading, error, addIngredientToCart } = useContext(IngredientsContext);

    const [current, setCurrent] = useState('Булки');

    const categorizedItems = useMemo(() => ({
        'Булки': items.filter(item => item.type === 'bun'),
        'Соусы': items.filter(item => item.type === 'sauce'),
        'Начинки': items.filter(item => item.type === 'main'),
    }), [items]);

    const refs = {
        'Булки': useRef(null),
        'Соусы': useRef(null),
        'Начинки': useRef(null),
    };

    const handleTabClick = (tab) => {
        setCurrent(tab);
        refs[tab].current.scrollIntoView({behavior: 'smooth'});
    };

    if (isLoading) {
        return <p className="text text_type_main-medium text_color_inactive mt-10 ml-10">Загрузка...</p>;
    }

    if (error) {
        return <p className="text text_type_main-medium text_color_inactive mt-10 ml-10">Произошла ошибка. Пожалуйста, перезагрузите страницу.</p>;
    }

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={styles.tabs}>
                {Object.keys(categorizedItems).map(category => (
                    <Tab key={category} value={category} active={current === category}
                         onClick={() => handleTabClick(category)}>
                        {category}
                    </Tab>
                ))}
            </div>

            <ul className={`${styles['create-burger']} custom-scroll`}>
                {Object.entries(categorizedItems).map(([category, ingredients]) => (
                    <li key={category} ref={refs[category]}>
                        <h2 className="text text_type_main-medium mt-10">{category}</h2>
                        <ul className={`${styles.ingredients} mt-6 ml-4`}>
                            {ingredients.map((ingredient) => (
                                <li
                                    key={ingredient._id}
                                    className={styles.ingredient}
                                    onClick={() => {
                                        openModal(ingredient);
                                        addIngredientToCart(ingredient);
                                    }}
                                >
                                    <Counter count={1} size="default" extraClass="m-1"/>
                                    <img src={ingredient.image} alt={ingredient.name} width="240" height="120"/>
                                    <div className={styles.price}>
                                        <span className="text text_type_digits-default">{ingredient.price}</span>
                                        <CurrencyIcon type="primary"/>
                                    </div>
                                    <span className="text text_type_main-default">{ingredient.name}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
});

BurgerIngredients.propTypes = {
    openModal:  PropTypes.func.isRequired,
};

export default BurgerIngredients;