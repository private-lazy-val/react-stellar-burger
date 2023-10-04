import React from 'react';
import styles from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import ingredientPropType from "../../utils/prop-types";
import {useSelector} from "react-redux";
import {getBun, getIngredients} from "../../features/burgerConstructor/burgerConstructorSlice";

const BurgerIngredient = ({ingredient, openModal}) => {
    const bun = useSelector(getBun);
    const ingredients = useSelector(getIngredients);

    const handleIngredientClick = (ingredient) => {
        openModal(ingredient);
    }

    const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: {ingredient},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    // Calculate the count for the ingredient
    let count = ingredients.filter((ing) => ing._id === ingredient._id).length;
    if (bun?._id === ingredient._id) {
        count += 2; // Considering that the bun is used twice (top and bottom).
    }

    return (
        <li
            ref={dragRef}
            className={styles.ingredient}
            style={{opacity}}
            onClick={() => {
                handleIngredientClick(ingredient)
            }}
        >
            {count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}
            <img src={ingredient.image} alt={ingredient.name} width="240" height="120"/>
            <div className={styles.price}>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <span className="text text_type_main-default">{ingredient.name}</span>
        </li>
    );
};

BurgerIngredient.propTypes = {
    ingredient: ingredientPropType.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default BurgerIngredient;