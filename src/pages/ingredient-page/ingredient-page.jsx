import {useSelector} from "react-redux";
import React from "react";
import {useParams} from "react-router-dom";
import {
    getIngredients,
    selectIngredientsError,
    selectIngredientsStatus
} from "../../services/burger-ingredients/selector";
import styles from "./ingredient-page.module.css";
import LoadingComponent from "../../utils/loading-component";
import ItemNotFound from "../../utils/item-not-found";
import {useDelayedLoader} from "../../hooks/use-delayed-loader";
import IngredientInfo from "../../components/modals/ingredient-info/ingredient-info";

const IngredientPage = () => {
    const {ingredientId} = useParams();
    const { allIngredients, ingredientsFetchStatus, ingredientsFetchError } = useSelector(state => {
        const { allIngredients } = getIngredients(state);
        return {
            allIngredients,
            ingredientsFetchStatus: selectIngredientsStatus(state),
            ingredientsFetchError: selectIngredientsError(state)
        };
    });

    const isLoading = ingredientsFetchStatus === 'loading';
    const showLoader = useDelayedLoader(isLoading, 300);

    const ingredient = allIngredients[ingredientId] || null;

    let content;

    if (showLoader) {
        content = <div className="page-backdrop"><LoadingComponent/></div>
    } else if (ingredientsFetchStatus === 'failed' && !showLoader) {
        content = <div className="page-backdrop text_type_digits-medium">{ingredientsFetchError}</div>
    } else if (ingredientsFetchStatus === 'succeeded' && ingredient) {
        content = (
            <IngredientInfo title="Детали ингредиента"/>
        )
    }

    if (!ingredient && ingredientsFetchStatus === 'succeeded') {
        content = <div className="page-backdrop"><ItemNotFound/></div>
    }

    return (
        <main className={styles.wrapper}>
            {content}
        </main>
    );
};

export default IngredientPage;