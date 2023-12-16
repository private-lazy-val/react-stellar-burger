import React, {useCallback} from 'react';
import styles from "../droppable-ingredient-area/droppable-ingredient-area.module.css";
import {moveIngredients} from "../../services/burger-constructor/burger-constructor-slice";
import {selectIngredients} from "../../services/burger-constructor/selector";
import {useDispatch, useSelector} from "react-redux";
import DraggableIngredient from '../draggable-ingredient/draggable-ingredient';

const DroppableIngredientArea = React.memo((): React.JSX.Element => {
    const ingredients = useSelector(selectIngredients);
    const dispatch = useDispatch();

    // Handle reordering logic
    const moveIngredient = useCallback(
        (dragIndex: number, hoverIndex: number): void => {
            dispatch(moveIngredients({fromIndex: dragIndex, toIndex: hoverIndex}));
        },
        [dispatch]
    );

    return (

        <ul className={`${styles['inner-list']} custom-scroll`}>
            {ingredients.map((ingredient, index) => (
                <DraggableIngredient
                    key={ingredient.uuid}
                    id={ingredient.uuid!}
                    ingredient={ingredient}
                    index={index}
                    moveIngredient={moveIngredient}
                />
            ))}
        </ul>
    );
});

export default DroppableIngredientArea;