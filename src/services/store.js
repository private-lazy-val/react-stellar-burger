import {configureStore} from "@reduxjs/toolkit";
import burgerIngredientsReducer from './burger-ingredients/burger-ingredients-slice';
import burgerConstructorReducer from './burger-constructor/burger-constructor-slice';
import submitOrderReducer from './submit-order/submit-order-slice';
import modalReducer from './modal/modal-slice';
import userReducer from './user/user-slice';
import ordersFeedReducer from "./orders-feed/orders-feed-reducer";
import orderInfoReducer from "./order-info/order-info-slice";
import profileOrdersReducer from "./profile-orders/profile-orders-reducer";
import {wsMiddleware} from './middleware/ws-middleware';
import {
    connect as profileOrdersWsConnect,
    disconnect as profileOrdersWsDisconnect,
    wsConnecting as profileOrdersWsConnecting,
    wsOpen as profileOrdersWsOpen,
    wsClose as profileOrdersWsClose,
    wsMessage as profileOrdersWsMessage,
    wsError as profileOrdersWsError,
    wsTokenRefresh as profileOrdersWsTokenRefresh
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
    wsTokenRefresh: profileOrdersWsTokenRefresh
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
        ordersFeed: ordersFeedReducer,
        profileOrders: profileOrdersReducer,
        orderInfo: orderInfoReducer,
        submitOrder: submitOrderReducer,
        modal: modalReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false}).concat(profileOrdersMiddleware, ordersFeedMiddleware);
    }
});