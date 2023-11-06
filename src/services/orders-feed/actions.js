import { createAction } from '@reduxjs/toolkit';

export const connect = createAction('ORDERS_FEED_WS_CONNECT')
export const disconnect = createAction('ORDERS_FEED_WS_DISCONNECT');
export const wsConnecting = createAction('ORDERS_FEED_WS_CONNECTING');
export const wsOpen = createAction('ORDERS_FEED_WS_OPEN');
export const wsClose = createAction('ORDERS_FEED_WS_CLOSE');
export const wsMessage = createAction('ORDERS_FEED_WS_MESSAGE');
export const wsError = createAction('ORDERS_FEED_WS_ERROR');