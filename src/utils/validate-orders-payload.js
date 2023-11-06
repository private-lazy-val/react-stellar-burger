export const validateOrdersPayload = (orders) => {
    return !(!orders || !Array.isArray(orders) || orders.length === 0);
}

export const validateOrder = (order) => {
    // Check each order in the array
    return !(order === null || !Array.isArray(order.ingredients) || order.ingredients.length === 0);

}

export const validateOrderIngredients = (order, ingredientsMap) => {
    // Return only valid ingredient IDs
    return order.ingredients.filter(ingredientId => (
        ingredientId !== null && ingredientsMap.hasOwnProperty(ingredientId)
    ));
}