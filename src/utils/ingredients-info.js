export const getIngredientsTotalPrice = (ingredientCount, ingredientsMap) => {
    if (Object.keys(ingredientCount).length === 0) return 0;

    return Object.entries(ingredientCount).reduce((sum, [ingredientId, count]) => {
        const ingredient = ingredientsMap[ingredientId];
        if (ingredient) {
            return sum + count * ingredient.price;
        } else {
            return sum;
        }
    }, 0);
};

export const getCount = (arr) => {
    return arr.reduce((count, el) => {
        if (!count.hasOwnProperty(el)) {
            count[el] = 0;
        }
        count[el]++;
        return count;
    }, {})
}

export const getIngredientCount = (order) => {
    if (!order || !order.ingredients) {
        return {};
    }
    return getCount(order.ingredients)
}

export const getUnique = (arr) => {
    return Array.from(new Set(arr))
}
