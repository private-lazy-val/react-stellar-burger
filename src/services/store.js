import {configureStore} from "@reduxjs/toolkit";
import burgerIngredientsReducer from './burger-ingredients/burger-ingredients-slice';
import burgerConstructorReducer from './burger-constructor/burger-constructor-slice';
import ingredientDetailsReducer from './ingredient-details/ingredient-details-slice';
import submitOrderReducer from './submit-order/submit-order-slice';
import modalReducer from './modal/modal-slice';
import userReducer from './user/user-slice';
import ordersFeedSliceReducer from "./orders-feed/orders-feed-slice";
import orderDetailsReducer from "./order-details/order-details-slice";
import userOrdersReducer from "./user-orders/user-orders-slice";

export default configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        ordersFeed: ordersFeedSliceReducer,
        orderDetails: orderDetailsReducer,
        submitOrder: submitOrderReducer,
        modal: modalReducer,
        user: userReducer,
        userOrders: userOrdersReducer
    }
});