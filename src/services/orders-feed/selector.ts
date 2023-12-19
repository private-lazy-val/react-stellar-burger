import {RootState} from "../store";
import {WebsocketStatuses} from "../../enums";

export const selectOrdersFeedOrders = (state: RootState): Order[] => state.ordersFeed.orders;
export const selectOrdersFeedTotal = (state: RootState): number => state.ordersFeed.total;
export const selectOrdersFeedTotalToday = (state: RootState): number => state.ordersFeed.totalToday;
export const selectOrdersFeedStatus = (state: RootState): WebsocketStatuses => state.ordersFeed.status;
export const selectOrdersFeedConnectingError = (state: RootState): string => state.ordersFeed.connectingError;
export const selectOrdersFeedIsInitialDataLoaded = (state: RootState): boolean => state.ordersFeed.isInitialDataLoaded;