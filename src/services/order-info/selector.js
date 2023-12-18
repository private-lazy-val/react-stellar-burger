import {createSelector} from "@reduxjs/toolkit";

// export const selectOrder = (state) => state.orderInfo.order;
export const selectOrderStatus = (state) => state.orderInfo.status;
export const selectOrderError = (state) => state.orderInfo.error;
export const selectOrder = (state) => state.orderInfo.order;
const selectOrders = (state) => state.ordersFeed.ordersMap;
const selectProfileOrders = (state) => state.profileOrders.ordersMap;

// By using createSelector, the function is memoized, meaning that it will only recalculate
// the return value if the inputs (in this case, orders, profileOrders, and order from the state) have changed
export const getOrder = (number) => createSelector(
    [selectOrders, selectProfileOrders, selectOrder],
    (orders, profileOrders, order) => {
        return orders?.[number] || profileOrders?.[number] || order;
    }
);