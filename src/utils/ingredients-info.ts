type IngredientCount = {
    [ingredientId: string]: number;
};

export const getIngredientsTotalPrice = (ingredientCount: IngredientCount, ingredientsMap: IngredientsMap): number => {
    if (Object.keys(ingredientCount).length === 0) return 0;

    return Object.entries(ingredientCount).reduce((sum, [_id, count]) => {
        const ingredient = ingredientsMap[_id];
        if (ingredient) {
            return sum + count * ingredient.price;
        } else {
            return sum;
        }
    }, 0);
};

export const getCount = (arr: string[]): IngredientCount => {
    return arr.reduce((count, el) => {
        if (!count.hasOwnProperty(el)) {
            count[el] = 0;
        }
        count[el]++;
        return count;
    }, {} as IngredientCount);
}

export const getIngredientCount = (order: Order): IngredientCount => {
    if (!order || !order.ingredients) {
        return {};
    }
    return getCount(order.ingredients)
}

export const getUnique = <T>(arr: T[]): T[] => {
    return Array.from(new Set(arr));
}
