export const getIngredientsTotalPrice = (order, ingredientsMap) => {
    if (!order || !order.ingredients) return 0;

    const ingredientsPrices = order.ingredients.map(ingredientId => {
            if (ingredientsMap[ingredientId]) {
                return ingredientsMap[ingredientId].price;
            } else {
                return 0;
            }
        }
    );
    return ingredientsPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

export const getIngredientCount = (ingredientId, order) => {
    if (!order || !order.ingredients) {
        return 0;
    }
    return order.ingredients.reduce((count, currentIngredientId) => {
        return count + (currentIngredientId === ingredientId ? 1 : 0);
    }, 0);
}