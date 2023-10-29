import {configureStore} from "@reduxjs/toolkit";
import burgerIngredientsReducer from './burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConstructor/burgerConstructorSlice';
import ingredientDetailsReducer from './ingredientDetails/ingredientDetailsSlice';
import orderDetailsReducer from './orderDetails/orderDetailsSlice';
import modalReducer from './modal/modalSlice';
import {apiSlice} from "../app/api/apiSlice";
import authReducer from '../services/auth/authSlice';

export default configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        orderDetails: orderDetailsReducer,
        modal: modalReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devtools: true
});