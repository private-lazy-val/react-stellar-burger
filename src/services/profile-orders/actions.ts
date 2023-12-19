import { createAction } from '@reduxjs/toolkit';
import {WsMessagePayload} from "../../utils/types";
export const connect = createAction<string>('PROFILE_ORDERS_WS_CONNECT')
export const disconnect = createAction('PROFILE_ORDERS_WS_DISCONNECT');
export const wsConnecting = createAction('PROFILE_ORDERS_WS_CONNECTING');
export const wsOpen = createAction('PROFILE_ORDERS_WS_OPEN');
export const wsClose = createAction('PROFILE_ORDERS_WS_CLOSE');
export const wsMessage = createAction<WsMessagePayload>('PROFILE_ORDERS_WS_MESSAGE');
export const wsError = createAction<string>('PROFILE_ORDERS_WS_ERROR');
export const wsTokenRefresh = createAction('WS_TOKEN_REFRESH');
export const resetOrders = createAction('PROFILE_ORDERS_RESET');

export type TProfileOrdersActions =
    | ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>
    | ReturnType<typeof wsTokenRefresh>
    | ReturnType<typeof resetOrders>;
