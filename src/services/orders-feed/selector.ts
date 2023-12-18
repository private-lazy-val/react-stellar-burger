import {RootState} from "../store";
import {Order, websocketStatuses} from "../../utils/types";

export const selectOrdersFeedOrders = (state: RootState): Order[] => state.ordersFeed.orders;
export const selectOrdersFeedTotal = (state: RootState): number => state.ordersFeed.total;
export const selectOrdersFeedTotalToday = (state: RootState): number => state.ordersFeed.totalToday;
export const selectOrdersFeedStatus = (state: RootState): websocketStatuses => state.ordersFeed.status;
export const selectOrdersFeedConnectingError = (state: RootState): string => state.ordersFeed.connectingError;
export const selectOrdersFeedIsInitialDataLoaded = (state: RootState): boolean => state.ordersFeed.isInitialDataLoaded;