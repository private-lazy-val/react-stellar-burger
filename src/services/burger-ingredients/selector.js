export const selectAllIngredients = (state) => state.burgerIngredients.ingredients;
export const selectIngredientsMap = (state) => state.burgerIngredients.ingredientsMap;
export const selectIngredientById = (state, _id) =>
    state.burgerIngredients.ingredients.find(ingredient => ingredient._id === _id);
export const selectCurrentTab = (state) => state.burgerIngredients.currentTab;
export const selectIsLoadingIngredients = (state) => state.burgerIngredients.isLoading;
export const selectHasErrorIngredients = (state) => state.burgerIngredients.hasError;
