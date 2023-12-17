import {combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import burgerIngredientsReducer, {TBurgerIngredientsActions} from './burger-ingredients/burger-ingredients-slice';
import burgerConstructorReducer, {TBurgerConstructorActions} from './burger-constructor/burger-constructor-slice';
import submitOrderReducer from './submit-order/submit-order-slice';
import modalReducer, {TModalActions} from './modal/modal-slice';
import userReducer from './user/user-slice';
import ordersFeedReducer from "./orders-feed/orders-feed-reducer";
import orderInfoReducer from "./order-info/order-info-slice";
import profileOrdersReducer from "./profile-orders/profile-orders-reducer";
import {wsMiddleware} from './middleware/ws-middleware';
import {
    TypedUseSelectorHook,
        useDispatch as dispatchHook,
        useSelector as selectorHook,
} from "react-redux";

import {
    connect as profileOrdersWsConnect,
    disconnect as profileOrdersWsDisconnect,
    wsConnecting as profileOrdersWsConnecting,
    wsOpen as profileOrdersWsOpen,
    wsClose as profileOrdersWsClose,
    wsMessage as profileOrdersWsMessage,
    wsError as profileOrdersWsError,
    wsTokenRefresh as profileOrdersWsTokenRefresh, TProfileOrdersActions
} from "./profile-orders/actions";

import {
    connect as ordersFeedWsConnect,
    disconnect as ordersFeedWsDisconnect,
    wsConnecting as ordersFeedWsConnecting,
    wsOpen as ordersFeedWsOpen,
    wsClose as ordersFeedWsClose,
    wsMessage as ordersFeedWsMessage,
    wsError as ordersFeedWsError, TOrdersFeedActions
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

const reducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ordersFeed: ordersFeedReducer,
    profileOrders: profileOrdersReducer,
    orderInfo: orderInfoReducer,
    submitOrder: submitOrderReducer,
    modal: modalReducer,
    user: userReducer
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false}).concat(profileOrdersMiddleware, ordersFeedMiddleware);
    }
});

export type RootState = ReturnType<typeof reducer>;

export type AppActions =
    | TBurgerIngredientsActions
    | TBurgerConstructorActions
    | TModalActions
    | TProfileOrdersActions
    | TOrdersFeedActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export type AppDispatch<TReturnType = void> = (
    action: AppActions | AppThunk<TReturnType>
) => TReturnType;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;


