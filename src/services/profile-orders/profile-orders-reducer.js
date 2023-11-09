import {createReducer} from '@reduxjs/toolkit';
import {websocketStatus} from '../../utils/ws-status';
import {resetOrders, wsClose, wsConnecting, wsError, wsMessage, wsOpen} from './actions';

const initialState = {
    status: websocketStatus.OFFLINE,
    ordersMap: null,
    orders: [],
    connectingError: '',
    isInitialDataLoaded: false
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
            state.ordersMap = action.payload.orders.reduce((acc, order) => {
                // Use order.number as the key, and spread the rest of the order properties as the value
                const {number, ...orderWithoutNumber} = order;
                acc[number] = orderWithoutNumber;
                return acc;
            }, {});
            state.orders = action.payload.orders;
            state.isInitialDataLoaded = true;
        })
        .addCase(resetOrders, state => {
            state.orders = []; // This will reset the orders to an empty array
            state.orders = null;
        })
})

export default profileOrdersReducer;
