import {IngredientsMap, Order} from "./types";

export const validateOrdersPayload = (orders: Order[]): boolean => {
    return !(!orders || !Array.isArray(orders) || orders.length === 0);
}

export const validateOrder = (order: Order): boolean => {
    // Check each order in the array
    return !(order === null || !Array.isArray(order.ingredients) || order.ingredients.length === 0);
}

export const validateOrderIngredients = (order: Order, ingredientsMap: IngredientsMap): string[] => {
    // Return only valid ingredient IDs
    return order.ingredients.filter(ingredientId => (
        ingredientId !== null && ingredientsMap.hasOwnProperty(ingredientId)
    ));
}
