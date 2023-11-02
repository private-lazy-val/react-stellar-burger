import {configureStore} from "@reduxjs/toolkit";
import burgerIngredientsReducer from './burgerIngredients/burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConstructor/burgerConstructorSlice';
import ingredientDetailsReducer from './ingredientDetails/ingredientDetailsSlice';
import orderDetailsReducer from './orderDetails/orderDetailsSlice';
import modalReducer from './modal/modalSlice';
import userReducer from '../services/user/userSlice';
import ordersFeedSliceReducer from "./ordersFeed/ordersFeedSlice";

export default configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        ordersFeed: ordersFeedSliceReducer,
        orderDetails: orderDetailsReducer,
        modal: modalReducer,
        user: userReducer
    }
});