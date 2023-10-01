import React, {useState, useRef, useMemo, useCallback, useEffect} from "react";
import styles from "./burger-ingredients.module.css";
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from 'react-redux';
import {
    selectIngredients,
    loadAllIngredients,
    isLoadingIngredients,
    hasErrorIngredients
} from "../../services/burgerIngredientsSlice";
import {addBun, addIngredient} from "../../services/burgerConstructorSlice";
import {v4 as uuidv4} from "uuid";

const BurgerIngredients = React.memo(({openModal}) => {
    const allIngredients = useSelector(selectIngredients);
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingIngredients);
    const hasError = useSelector(hasErrorIngredients);

    const [current, setCurrent] = useState('Булки');

    useEffect(() => {
        dispatch(loadAllIngredients());
    }, [dispatch]);

    const categorizedItems = useMemo(() => ({
        'Булки': allIngredients.filter(item => item.type === 'bun'),
        'Соусы': allIngredients.filter(item => item.type === 'sauce'),
        'Начинки': allIngredients.filter(item => item.type === 'main'),
    }), [allIngredients]);

    const refs = {
        'Булки': useRef(null),
        'Соусы': useRef(null),
        'Начинки': useRef(null),
    };

    const addIngredientToCart = useCallback((ingredient) => {
        const ingredientWithUUID = {...ingredient, uuid: uuidv4()};
        if (ingredient.type === 'bun') {
            dispatch(addBun(ingredientWithUUID));
        } else {
            dispatch(addIngredient(ingredientWithUUID));
        }
    }, [dispatch]);

    const handleTabClick = (tab) => {
        setCurrent(tab);
        refs[tab].current.scrollIntoView({behavior: 'smooth'});
    };

    const handleIngredientClick = (ingredient) => {
        openModal(ingredient);
    }

    if (isLoading) {
        return <p className="text text_type_main-medium text_color_inactive mt-10 ml-10">Загрузка...</p>;
    }

    if (hasError) {
        return <p className="text text_type_main-medium text_color_inactive mt-10 ml-10">Произошла ошибка. Пожалуйста,
            перезагрузите страницу.</p>;
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
                                        handleIngredientClick(ingredient);
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
    openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;