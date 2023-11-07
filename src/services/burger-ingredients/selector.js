export const selectAllIngredients = (state) => state.burgerIngredients.ingredients;
export const selectIngredientsMap = (state) => state.burgerIngredients.ingredientsMap;
export const selectCurrentTab = (state) => state.burgerIngredients.currentTab;
export const selectIsLoadingIngredients = (state) => state.burgerIngredients.isLoading;
export const selectHasErrorIngredients = (state) => state.burgerIngredients.hasError;
