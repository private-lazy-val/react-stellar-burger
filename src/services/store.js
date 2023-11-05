import {configureStore} from "@reduxjs/toolkit";
import burgerIngredientsReducer from './burger-ingredients/burger-ingredients-slice';
import burgerConstructorReducer from './burger-constructor/burger-constructor-slice';
import ingredientDetailsReducer from './ingredient-details/ingredient-details-slice';
import submitOrderReducer from './submit-order/submit-order-slice';
import modalReducer from './modal/modal-slice';
import userReducer from './user/user-slice';
import ordersFeedReducer from "./orders-feed/orders-feed-reducer";
import orderDetailsReducer from "./order-details/order-details-slice";
import profileOrdersReducer from "./profile-orders/profile-orders-reducer";
import {wsMiddleware} from './middleware/ws-middleware';
import {
    connect as profileOrdersWsConnect,
    disconnect as profileOrdersWsDisconnect,
    wsConnecting as profileOrdersWsConnecting,
    wsOpen as profileOrdersWsOpen,
    wsClose as profileOrdersWsClose,
    wsMessage as profileOrdersWsMessage,
    wsError as profileOrdersWsError
} from "./profile-orders/actions";
import {
    connect as ordersFeedWsConnect,
    disconnect as ordersFeedWsDisconnect,
    wsConnecting as ordersFeedWsConnecting,
    wsOpen as ordersFeedWsOpen,
    wsClose as ordersFeedWsClose,
    wsMessage as ordersFeedWsMessage,
    wsError as ordersFeedWsError
} from "./orders-feed/actions";


const profileOrdersMiddleware = wsMiddleware({
    wsConnect: profileOrdersWsConnect,
    wsDisconnect: profileOrdersWsDisconnect,
    wsConnecting: profileOrdersWsConnecting,
    onOpen: profileOrdersWsOpen,
    onClose: profileOrdersWsClose,
    onError: profileOrdersWsError,
    onMessage: profileOrdersWsMessage,
})

const ordersFeedMiddleware = wsMiddleware({
    wsConnect: ordersFeedWsConnect,
    wsDisconnect: ordersFeedWsDisconnect,
    wsConnecting: ordersFeedWsConnecting,
    onOpen: ordersFeedWsOpen,
    onClose: ordersFeedWsClose,
    onError: ordersFeedWsError,
    onMessage: ordersFeedWsMessage,
})

export default configureStore({
    reducer: {
        burgerIngredients: burgerIngredientsReducer,
        burgerConstructor: burgerConstructorReducer,
        ingredientDetails: ingredientDetailsReducer,
        ordersFeed: ordersFeedReducer,
        profileOrders: profileOrdersReducer,
        orderDetails: orderDetailsReducer,
        submitOrder: submitOrderReducer,
        modal: modalReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false}).concat(profileOrdersMiddleware, ordersFeedMiddleware);
    }
});