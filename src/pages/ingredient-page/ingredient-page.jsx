import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {
    selectHasErrorIngredients,
    selectIngredientById,
    selectIsLoadingIngredients
} from "../../services/burgerIngredients/selector";
import {loadAllIngredients} from "../../services/burgerIngredients/burgerIngredientsSlice";
import styles from "./ingredient-page.module.css";
import useLoadingAndErrorHandling from "../../hooks/useLoadingAndErrorHandling";
import LoadingComponent from "../../utils/loading-component";
import ErrorComponent from "../../utils/error-component";

const IngredientPage = ({title}) => {
    const {isLoading, hasError} = useLoadingAndErrorHandling(selectIsLoadingIngredients, selectHasErrorIngredients);

    const dispatch = useDispatch();
    const {ingredientId} = useParams();

    useEffect(() => {
        dispatch(loadAllIngredients());
    }, [dispatch]);

    const ingredient = useSelector(state => selectIngredientById(state, ingredientId));

    if (isLoading) {
        return <div className={styles.backdrop}><LoadingComponent/></div>;
    }

    if (!isLoading && hasError) {
        return <div className={styles.error}><ErrorComponent/></div>;
    }

    return (
            ingredient && (
                <main className={styles.wrapper}>
                    <h1 className="text text_type_main-large">{title}</h1>
                    <img className='mt-3' src={ingredient.image_large} alt={ingredient.name}/>
                    <h2 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h2>
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
                </main>)
    );
};

IngredientPage.propTypes = {
    title: PropTypes.string.isRequired,
};

export default IngredientPage;