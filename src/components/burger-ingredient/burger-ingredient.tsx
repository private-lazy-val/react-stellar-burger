import React, {useMemo} from 'react';
import styles from "./burger-ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {makeSelectIngredientCount} from "../../services/burger-constructor/selector";
import useModal from "../../hooks/use-modal";
import {Link, useLocation} from "react-router-dom";
import {BaseIngredient} from "../../utils/types";
import {useSelector} from "../../services/store";

type BurgerIngredientProps = {
    ingredient: BaseIngredient;
}

type DragCollectedProps = {
    opacity: number;
}

const BurgerIngredient = React.memo(({ingredient}: BurgerIngredientProps): React.JSX.Element => {
    const location = useLocation();

    const ingredientId = ingredient['_id'];
    // This selection function is utilized to keep a stable reference to the created selector
    const selectIngredientCount = useMemo(makeSelectIngredientCount, []);
    // If the parts of the state that this selector depends upon (bun and ingredients) are updated in the Redux store,
    // useSelector will trigger a re-run of the selection function and, if the selected value (count) changes, the component will re-render.
    const count = useSelector(state => selectIngredientCount(state, ingredient._id));

    const {
        openIngredientModal
    } = useModal();

    const [{opacity}, dragRef] = useDrag<BaseIngredient, unknown, DragCollectedProps>({
        type: "ingredient",
        // Defines the draggable item object which holds the data that describes the dragged item
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <Link
            key={ingredientId}
            // Тут мы формируем динамический путь для нашего ингредиента
            to={`/ingredients/${ingredientId}`}
            // а также сохраняем в свойство background роут,
            // на котором была открыта наша модалка
            state={{background: location}}
            ref={dragRef}
            className={styles.ingredient}
            style={{opacity}}
            onClick={() => {
                openIngredientModal()
            }}
        >
            {count > 0 && <Counter count={count} size="default" extraClass="m-1"/>}
            <img src={ingredient.image} alt={ingredient.name} width="240" height="120"/>
            <div className={styles.price}>
                <span className="text text_type_digits-default">{ingredient.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <span className="text text_type_main-default">{ingredient.name}</span>
        </Link>
    );
});

export default BurgerIngredient;