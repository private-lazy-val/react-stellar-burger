import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Ingredient} from "../burger-constructor/burger-constructor-slice";
import {AsyncThunkStatuses, IngredientsMap, IngredientsTypes} from "../../utils/types";

export const selectAllIngredients = (state: RootState): Ingredient[] => state.burgerIngredients.ingredients;
export const selectCurrentTab = (state: RootState): IngredientsTypes => state.burgerIngredients.currentTab;
export const selectIngredientsStatus = (state: RootState): AsyncThunkStatuses => state.burgerIngredients.status;
export const selectIngredientsError = (state: RootState): string | null => state.burgerIngredients.error;

// Selectors created with createSelector from Reselect or Redux Toolkit are memoized.
// This means they will only recompute the result when the input selectors return new values.
// As long as ingredientsMap doesn't change, the getIngredientsMap selector will return the same object,
// and thus not cause a component using this selector to re-render.
export const getIngredientsMap = createSelector(
    (state: RootState) => state.burgerIngredients.ingredientsMap,
    (ingredientsMap: IngredientsMap) => {
        return { allIngredients: ingredientsMap };
    }
)