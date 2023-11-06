import {createReducer} from '@reduxjs/toolkit';
import {websocketStatus} from '../../utils/ws-status';
import {
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage,
    resetOrders
} from './actions';

const initialState = {
    status: websocketStatus.OFFLINE,
    orders: [],
    connectingError: ''
}

const profileOrdersReducer = createReducer(initialState, (builder) => {
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
        })
        .addCase(resetOrders, state => {
            state.orders = []; // This will reset the orders to an empty array
        })
})

export default profileOrdersReducer;
