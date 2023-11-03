export const selectAllOrders = (state) => state.ordersFeed.orders;
export const selectTotalOrders = (state) => state.ordersFeed.total;
export const selectTodayTotalOrders = (state) => state.ordersFeed.totalToday;
export const areOrdersLoading = (state) => state.ordersFeed.isLoading;
export const ordersHaveError =(state) => state.ordersFeed.hasError;
