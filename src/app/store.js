import { configureStore } from "@reduxjs/toolkit";
import burgerIngredientsReducer from '../features/burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReducer from '../features/burgerConstructor/burgerConstructorSlice';
import ingredientDetailsReducer from '../features/ingredientDetails/ingredientDetailsSlice';
import orderDetailsReducer from '../features/orderDetails/orderDetailsSlice';
import modalSliceReducer from '../features/modal/modalSlice';

export default configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orderDetailsReducer,
        modal: modalSliceReducer
    },
});