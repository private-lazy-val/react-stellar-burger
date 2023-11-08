import {createSelector} from "@reduxjs/toolkit";

export const selectOrder = (state) => state.orderInfo.order;
export const selectOrderStatus = (state) => state.orderInfo.status;
export const selectOrderError = (state) => state.orderInfo.error;

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
