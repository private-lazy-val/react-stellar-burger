import {createReducer} from '@reduxjs/toolkit';
import {websocketStatus} from "../../utils/ws-status";
import {
    wsClose,
    wsConnecting,
    wsError,
    wsMessage,
    wsOpen
} from "./actions";
import {Order, OrdersMap} from "../../utils/types";

export type ordersFeedTypes = {
    status: websocketStatus;
    orders: Order[];
    ordersMap: OrdersMap | null;
    total: number;
    totalToday: number;
    connectingError: string;
    isInitialDataLoaded: boolean;
}

const initialState: ordersFeedTypes = {
    status: websocketStatus.OFFLINE,
    orders: [],
    ordersMap: null,
    total: 0,
    totalToday: 0,
    connectingError: '',
    isInitialDataLoaded: false
}

const ordersFeedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, state => {
            state.status = websocketStatus.CONNECTING;
        })
        .addCase(wsOpen, state => {
            state.status = websocketStatus.ONLINE;
            state.connectingError = '';
        })
        .addCase(wsClose, state => {
            state.status = websocketStatus.OFFLINE;
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
                state.orders = action.payload.orders;
                state.total = action.payload.total;
                state.totalToday = action.payload.totalToday;
                state.isInitialDataLoaded = true;
            }
        })
})

export default ordersFeedReducer;

