import {createSelector} from "@reduxjs/toolkit";

export const selectOrder = (state) => state.orderInfo.order;
export const selectOrderStatus = (state) => state.orderInfo.status;
export const selectOrderError = (state) => state.orderInfo.error;

// By using createSelector, the function is memoized, meaning that it will only recalculate
// the return value if the inputs (in this case, orders, profileOrders, and order from the state) have changed.
export const getOrder = number => {
    return createSelector(
        (state) => ({
            orders: state.ordersFeed.ordersMap,
            profileOrders: state.profileOrders.ordersMap,
            order: state.orderInfo.order
        }),
        ({orders, profileOrders, order}) => {
            return orders?.[number] || profileOrders?.[number] || order;
        }
    );
}
