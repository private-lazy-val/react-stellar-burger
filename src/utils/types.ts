export type BaseIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid?: string;
}

export type IngredientsMap = {
    [ingredientId: string]: BaseIngredient;
};

export type Order = {
    createdAt: string;
    ingredients: Array<string>;
    name: string;
    number: number;
    owner?: string;
    status: string;
    updatedAt: string;
    __v?: number;
    _id: string;
}

