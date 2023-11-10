import {createSelector} from "@reduxjs/toolkit";

export const selectAllIngredients = (state) => state.burgerIngredients.ingredients;
export const selectCurrentTab = (state) => state.burgerIngredients.currentTab;
export const selectIngredientsStatus = (state) => state.burgerIngredients.status;
export const selectIngredientsError = (state) => state.burgerIngredients.error;

// Selectors created with createSelector from Reselect or Redux Toolkit are memoized.
// This means they will only recompute the result when the input selectors return new values.
// As long as ingredientsMap doesn't change, the getIngredients selector will return the same object,
// and thus not cause a component using this selector to re-render.
export const getIngredients = createSelector(
    (state) => state.burgerIngredients.ingredientsMap,
    (ingredientsMap) => {
        return { allIngredients: ingredientsMap };
    }
)