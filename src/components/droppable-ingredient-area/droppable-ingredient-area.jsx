import React, {useCallback} from 'react';
import styles from "../droppable-ingredient-area/droppable-ingredient-area.module.css";
import {moveIngredients} from "../../features/burgerConstructor/burgerConstructorSlice";
import {getIngredients} from "../../features/burgerConstructor/selector";
import {useDispatch, useSelector} from "react-redux";
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';

const DroppableIngredientArea = React.memo(() => {
    const ingredients = useSelector(getIngredients);
    const dispatch = useDispatch();

    // Handle reordering logic
    const moveIngredient = useCallback(
        (dragIndex, hoverIndex) => {
            dispatch(moveIngredients({fromIndex: dragIndex, toIndex: hoverIndex}));
        },
        [dispatch]
    );

    return (

        <ul className={`${styles['inner-list']} custom-scroll`}>
            {ingredients.map((ingredient, index) => (
                <DraggableIngredient
                    key={ingredient.uuid}
                    id={ingredient.uuid}
                    ingredient={ingredient}
                    index={index}
                    moveIngredient={moveIngredient}
                />
            ))}
        </ul>
    );
});

export default DroppableIngredientArea;