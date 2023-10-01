import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from './burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import ingredientDetailsReducer from './ingredientDetailsSlice';
import orderDetailsReducer from './orderDetailsSlice';
import modalSliceReducer from './modal/modalSlice';

export default configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orderDetailsReducer,
        modal: modalSliceReducer
    },
});