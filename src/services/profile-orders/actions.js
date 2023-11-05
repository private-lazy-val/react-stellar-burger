import { createAction } from '@reduxjs/toolkit';
export const connect = createAction('PROFILE_ORDERS_WS_CONNECT')
export const disconnect = createAction('PROFILE_ORDERS_WS_DISCONNECT');
export const wsConnecting = createAction('PROFILE_ORDERS_WS_CONNECTING');
export const wsOpen = createAction('PROFILE_ORDERS_WS_OPEN');
export const wsClose = createAction('PROFILE_ORDERS_WS_CLOSE');
export const wsMessage = createAction('PROFILE_ORDERS_WS_MESSAGE');
export const wsError = createAction('PROFILE_ORDERS_WS_ERROR');
