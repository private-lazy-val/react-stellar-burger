export const selectOrdersFeedOrders = (state) => state.ordersFeed.orders;
export const selectOrdersFeedTotal = (state) => state.ordersFeed.total;
export const selectOrdersFeedTotalToday = (state) => state.ordersFeed.totalToday;
export const selectOrdersFeedStatus = (state) => state.ordersFeed.status;
export const selectOrdersFeedConnectingError = (state) => state.ordersFeed.connectingError;
export const selectOrdersFeedisInitialDataLoaded = (state) => state.ordersFeed.isInitialDataLoaded;