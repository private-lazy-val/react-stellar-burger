export const selectAllUserOrders = (state) => state.userOrders.orders;
export const selectTotalUserOrders = (state) => state.userOrders.total;
export const selectTodayTotalUserOrders = (state) => state.userOrders.totalToday;
export const areUserOrdersLoading = (state) => state.userOrders.isLoading;
export const userOrdersHaveError =(state) => state.userOrders.hasError;
