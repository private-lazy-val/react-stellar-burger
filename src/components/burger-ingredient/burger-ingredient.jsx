import React, {useMemo} from 'react';
import styles from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import ingredientPropType from "../../utils/prop-types";
import {useSelector} from "react-redux";
import {makeSelectIngredientCount} from "../../services/burgerConstructor/selector";

const BurgerIngredient = React.memo(({ingredient, openModal}) => {
    // Calculate the count for the ingredient
    const selectIngredientCount = useMemo(makeSelectIngredientCount, []);
    const count = useSelector(state => selectIngredientCount(state, ingredient._id));

    const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        // Defines the draggable item object which holds the data that describes the dragged item
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <li
            ref={dragRef}
            className={styles.ingredient}
            style={{opacity}}
            onClick={() => {
                openModal(ingredient)
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
});

BurgerIngredient.propTypes = {
    ingredient: ingredientPropType.isRequired,
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredient;