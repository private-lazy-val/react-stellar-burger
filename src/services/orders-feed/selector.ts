import {RootState} from "../store";

export const selectOrdersFeedOrders = (state: RootState) => state.ordersFeed.orders;
export const selectOrdersFeedTotal = (state: RootState) => state.ordersFeed.total;
export const selectOrdersFeedTotalToday = (state: RootState) => state.ordersFeed.totalToday;
export const selectOrdersFeedStatus = (state: RootState) => state.ordersFeed.status;
export const selectOrdersFeedConnectingError = (state: RootState) => state.ordersFeed.connectingError;
export const selectOrdersFeedisInitialDataLoaded = (state: RootState) => state.ordersFeed.isInitialDataLoaded;