import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
    wsClose,
    wsConnecting,
    wsError,
    wsMessage,
    wsOpen
} from "./actions";
import {WebsocketStatuses} from "../../enums";

export type ordersFeedTypes = {
    status: WebsocketStatuses;
    orders: Order[];
    ordersMap: OrdersMap | null;
    total: number;
    totalToday: number;
    connectingError: string;
    isInitialDataLoaded: boolean;
}

const initialState: ordersFeedTypes = {
    status: WebsocketStatuses.OFFLINE,
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
            state.status = WebsocketStatuses.CONNECTING;
        })
        .addCase(wsOpen, state => {
            state.status = WebsocketStatuses.ONLINE;
            state.connectingError = '';
        })
        .addCase(wsClose, state => {
            state.status = WebsocketStatuses.OFFLINE;
        })
        .addCase(wsError, (state, action: PayloadAction<string> ) => {
            state.connectingError = action.payload ?? "An unknown connection error occurred";
        })
        .addCase(wsMessage, (state, action:PayloadAction<ExtendedWsMessagePayload>) => {
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

