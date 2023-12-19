import {useSelector} from "../../services/store";
import React from "react";
import {useParams} from "react-router-dom";
import {
    getIngredientsMap,
    selectIngredientsError,
    selectIngredientsStatus
} from "../../services/burger-ingredients/selector";
import styles from "./ingredient-page.module.css";
import LoadingComponent from "../../utils/loading-component";
import ItemNotFound from "../../utils/item-not-found";
import {useDelayedLoader} from "../../hooks/use-delayed-loader";
import IngredientInfo from "../../components/modals/ingredient-info/ingredient-info";
import {AsyncThunkStatuses} from "../../utils/types";

const IngredientPage = (): React.JSX.Element => {
    const { ingredientId } = useParams<{ ingredientId: string }>();
    const { allIngredients, ingredientsFetchStatus, ingredientsFetchError } = useSelector(state => {
        const { allIngredients } = getIngredientsMap(state);
        return {
            allIngredients,
            ingredientsFetchStatus: selectIngredientsStatus(state),
            ingredientsFetchError: selectIngredientsError(state)
        };
    });

    const isLoading = ingredientsFetchStatus === AsyncThunkStatuses.loading;
    const showLoader = useDelayedLoader({ isLoading, delay: 300 });

    const ingredient = ingredientId ? allIngredients[ingredientId] : null;

    let content;

    if (showLoader) {
        content = <div className="page-backdrop"><LoadingComponent/></div>
    } else if (ingredientsFetchStatus === AsyncThunkStatuses.failed && !showLoader) {
        content = <div className="page-backdrop text_type_digits-medium">{ingredientsFetchError}</div>
    } else if (ingredientsFetchStatus === AsyncThunkStatuses.succeeded && ingredient) {
        content = (
            <IngredientInfo title="Детали ингредиента"/>
        )
    }

    if (!ingredient && ingredientsFetchStatus === AsyncThunkStatuses.succeeded) {
        content = <div className="page-backdrop"><ItemNotFound/></div>
    }

    return (
        <main className={styles.wrapper}>
            {content}
        </main>
    );
};

export default IngredientPage;