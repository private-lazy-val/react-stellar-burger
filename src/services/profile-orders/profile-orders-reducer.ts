import {createReducer} from '@reduxjs/toolkit';
import {resetOrders, wsClose, wsConnecting, wsError, wsMessage, wsOpen} from './actions';
import {Order, OrdersMap, websocketStatuses} from "../../utils/types";

export type profileOrdersTypes = {
    status: websocketStatuses;
    ordersMap: OrdersMap | null;
    orders: Order[];
    connectingError: string;
    isInitialDataLoaded: boolean;
}

const initialState: profileOrdersTypes = {
    status: websocketStatuses.OFFLINE,
    ordersMap: null,
    orders: [],
    connectingError: '',
    isInitialDataLoaded: false
}

const profileOrdersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, state => {
            state.status = websocketStatuses.CONNECTING;
        })
        .addCase(wsOpen, state => {
            state.status = websocketStatuses.ONLINE;
            state.connectingError = '';
        })
        .addCase(wsClose, state => {
            state.status = websocketStatuses.OFFLINE;
        })
        .addCase(wsError, (state, action) => {
            state.connectingError = action.payload ?? "An unknown connection error occurred";
        })
        .addCase(wsMessage, (state, action) => {
            if (action.payload) {
                state.ordersMap = action.payload.orders.reduce((acc, order) => {
                    // Use order.number as the key, and spread the rest of the order properties as the value
                    const {number, ...orderWithoutNumber} = order;
                    acc[number] = orderWithoutNumber;
                    return acc;
                }, {} as OrdersMap);
                state.orders = action.payload.orders;
                state.isInitialDataLoaded = true;
            }
        })
        .addCase(resetOrders, state => {
            state.orders = []; // This will reset the orders to an empty array
        })
})

export default profileOrdersReducer;
