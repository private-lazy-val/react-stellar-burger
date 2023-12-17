import { createAction } from '@reduxjs/toolkit';
import {ExtendedWsMessagePayload} from "../../utils/types";

export const connect = createAction<string>('ORDERS_FEED_WS_CONNECT')
export const disconnect = createAction('ORDERS_FEED_WS_DISCONNECT');
export const wsConnecting = createAction('ORDERS_FEED_WS_CONNECTING');
export const wsOpen = createAction('ORDERS_FEED_WS_OPEN');
export const wsClose = createAction('ORDERS_FEED_WS_CLOSE');
export const wsMessage = createAction<ExtendedWsMessagePayload>('ORDERS_FEED_WS_MESSAGE');
export const wsError = createAction<string>('ORDERS_FEED_WS_ERROR');

export type TOrdersFeedActions =
    | ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;