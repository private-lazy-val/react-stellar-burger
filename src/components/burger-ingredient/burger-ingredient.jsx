import React, {useMemo} from 'react';
import styles from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import ingredientPropType from "../../utils/prop-types";
import {useSelector} from "react-redux";
import {getBun, getIngredients} from "../../features/burgerConstructor/selector";

const BurgerIngredient = ({ingredient, openModal}) => {
    const bun = useSelector(getBun);
    const ingredients = useSelector(getIngredients);

    const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        // Defines the draggable item object which holds the data that describes the dragged item
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    // Calculate the count for the ingredient
    const counter = useMemo(() => {
        let count = ingredients.filter((ing) => ing._id === ingredient._id).length;
        if (bun?._id === ingredient._id) {
            count += 2;
        }
        return count;
    }, [ingredients, ingredient._id, bun]);


    return (
        <li
            ref={dragRef}
            className={styles.ingredient}
            style={{opacity}}
            onClick={() => {
                openModal(ingredient)
            }}
        >
            {counter > 0 && <Counter count={counter} size="default" extraClass="m-1"/>}
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
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredient;