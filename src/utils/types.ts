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
    alt?: string;
}

export type IngredientsMap = {
    [_id: string]: Omit<BaseIngredient, '_id'>;
};

type Owner = {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export type Order = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    owner?: Owner;
    status: string;
    updatedAt: string;
    __v?: number;
    _id: string;
}

export type OrdersMap = {
    [number: string]: Omit<Order, 'number'>;
}
export enum IngredientsTypes {
    Buns = 'Булки',
    Main = 'Начинки',
    Sauces = 'Соусы'
}

export enum AsyncThunkStatuses {
    'idle',
    'loading',
    'succeeded',
    'failed'
}

export type WsMessagePayload = {
    orders: Order[];
}

export type ExtendedWsMessagePayload = WsMessagePayload & {
    totalToday: number;
    total: number;
};

export type User = {
    email: string;
    name: string;
    password?: string;
};

export type SetActiveSection = {
    isActive: boolean;
};