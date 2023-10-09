import {createSelector} from "@reduxjs/toolkit";

export const selectBun = (state) => state.burgerConstructor.bun;
export const selectIngredients = (state) => state.burgerConstructor.ingredients;

// Reselect provides a function called createSelector to generate memoized selectors.
// createSelector accepts one or more "input selector" functions, plus an "output selector" function, and returns
// a new selector function.
export const makeSelectIngredientCount = () => createSelector(
    [selectIngredients, selectBun, (_, ingredientId) => ingredientId],
    (ingredients, bun, ingredientId) => {
        if (!Array.isArray(ingredients)) {
            return 0; // or handle it accordingly
        }

        let count = ingredients.filter((ing) => ing._id === ingredientId).length;
        if (bun?._id === ingredientId) {
            count += 2;
        }
        return count;
    }
);
