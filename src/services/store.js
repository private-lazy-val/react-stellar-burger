import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from './burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import ingredientDetailsReducer from './ingredientDetailsSlice';
import orderDetailsReducer from './orderDetailsSlice';

export default configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orderDetailsReducer
    },
});