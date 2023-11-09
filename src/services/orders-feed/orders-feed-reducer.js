import {createReducer} from '@reduxjs/toolkit';
import {websocketStatus} from "../../utils/ws-status";
import {
    wsClose,
    wsConnecting,
    wsError,
    wsMessage,
    wsOpen
} from "./actions";

const initialState = {
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
            state.connectingError = action.payload;
        })
        .addCase(wsMessage, (state, action) => {
            state.ordersMap = action.payload.orders.reduce((acc, order) => {
                // Use order.number as the key, and spread the rest of the order properties as the value
                const {number, ...orderWithoutNumber} = order;
                acc[number] = orderWithoutNumber;
                return acc;
            }, {});
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.isInitialDataLoaded = true;
        })
})

export default ordersFeedReducer;

