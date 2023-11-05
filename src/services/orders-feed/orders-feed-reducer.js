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
    total: 0,
    totalToday: 0,
    connectingError: ''
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
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        })
})

export default ordersFeedReducer;

