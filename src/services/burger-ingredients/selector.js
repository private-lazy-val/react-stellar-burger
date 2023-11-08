import {createSelector} from "@reduxjs/toolkit";

export const selectAllIngredients = (state) => state.burgerIngredients.ingredients;
export const selectIngredientsMap = (state) => state.burgerIngredients.ingredientsMap;
export const selectCurrentTab = (state) => state.burgerIngredients.currentTab;
export const selectIngredientsStatus = (state) => state.burgerIngredients.status;
export const selectIngredientsError = (state) => state.burgerIngredients.error;

export const getIngredients = createSelector(
    (state) => state.burgerIngredients.ingredientsMap,
    (ingredientsMap) => {
        console.log("ingredients");
        return { allIngredients: ingredientsMap };
    }
)