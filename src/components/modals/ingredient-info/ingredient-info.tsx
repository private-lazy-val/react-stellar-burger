import React from "react";
import styles from "./ingredient-info.module.css";
import {useParams} from "react-router-dom";
import {
    selectIngredientsError,
    getIngredientsMap,
    selectIngredientsStatus
} from "../../../services/burger-ingredients/selector";
import LoadingComponent from "../../../utils/loading-component";
import {useSelector} from '../../../services/store';
import {AsyncThunkStatuses} from "../../../enums";

type IngredientProps = {
    title: string;
}

type Ingredient = Omit<BaseIngredient, '_id' | 'uuid'>;

const IngredientInfo = React.memo(({title}: IngredientProps): React.JSX.Element => {
    const {ingredientId} = useParams<{ ingredientId: string }>();

    const {allIngredients, ingredientsFetchStatus, ingredientsFetchError} = useSelector(state => {
        const {allIngredients} = getIngredientsMap(state);
        return {
            allIngredients,
            ingredientsFetchStatus: selectIngredientsStatus(state),
            ingredientsFetchError: selectIngredientsError(state)
        };
    });

    const ingredient: Ingredient | null = ingredientId ? allIngredients[ingredientId] : null;

    let content;

    if (ingredientsFetchStatus === AsyncThunkStatuses.loading) {
        content = <div className="modal-backdrop"><LoadingComponent/></div>
    } else if (ingredientsFetchStatus === AsyncThunkStatuses.failed) {
        content = <div className="modal-backdrop text_type_digits-medium">{ingredientsFetchError}</div>
    } else if (ingredientsFetchStatus === AsyncThunkStatuses.succeeded && ingredient) {
        content = (
            <div className={`${styles.container} mb-15`}>
                <h2 className={`${styles.heading} text text_type_main-large`}>{title}</h2>
                <img className='mt-3' src={ingredient.image_large} alt={ingredient.name} width="480" height="240"/>
                <h3 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <span className="text text_type_main-default text_color_inactive">Калории,ккал</span>
                        <span
                            className="text text_type_digits-default text_color_inactive">{ingredient.calories}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default text_color_inactive">Белки, г</span>
                        <span
                            className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default text_color_inactive">Жиры, г</span>
                        <span className="text text_type_digits-default text_color_inactive">{ingredient.fat}</span>
                    </li>
                    <li className={styles.item}>
                        <span className="text text_type_main-default text_color_inactive">Углеводы, г</span>
                        <span
                            className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <>
            {content}
        </>
    );
});

export default IngredientInfo;