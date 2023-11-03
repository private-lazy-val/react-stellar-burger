export const selectOrderId = (state) => state.submitOrder.number;
export const selectIsLoadingOrderId = (state) => state.submitOrder.isLoading;
export const selectHasErrorOrderId = (state) => state.submitOrder.hasError;