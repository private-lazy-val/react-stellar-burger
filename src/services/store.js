import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from './burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConstructor/burgerConstructorSlice';
import ingredientDetailsReducer from './ingredientDetails/ingredientDetailsSlice';
import orderDetailsReducer from './orderDetails/orderDetailsSlice';
import modalReducer from './modal/modalSlice';

export default configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orderDetailsReducer,
        modal: modalReducer
    },
});