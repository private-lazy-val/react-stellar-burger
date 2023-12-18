import {createSelector} from "@reduxjs/toolkit";
import {Ingredient, Bun} from './burger-constructor-slice';
import {RootState} from "../store";

export const selectBun = (state: RootState): Bun | null => state.burgerConstructor.bun;
export const selectIngredients = (state: RootState): Ingredient[] => state.burgerConstructor.ingredients;

// Reselect provides a function called createSelector to generate memoized selectors.
// createSelector accepts one or more "input selector" functions, plus an "output selector" function, and returns
// a new selector function.
export const getIngredientCount = () => createSelector(
    [selectIngredients, selectBun, (_, ingredientId: string) => ingredientId],
    (ingredients, bun, ingredientId) => {
        if (!Array.isArray(ingredients)) {
            return 0;
        }
        let count = ingredients.filter((ing) => ing._id === ingredientId).length;
        if (bun?._id === ingredientId) {
            count += 2;
        }
        return count;
    }
);
