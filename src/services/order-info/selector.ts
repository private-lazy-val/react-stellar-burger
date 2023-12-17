import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Order} from "../../utils/types";

export const selectOrder = (state: RootState) => state.orderInfo.order;
export const selectOrderStatus = (state: RootState) => state.orderInfo.status;
export const selectOrderError = (state: RootState) => state.orderInfo.error;

// By using createSelector, the function is memoized, meaning that it will only recalculate
// the return value if the inputs (in this case, orders, profileOrders, and order from the state) have changed.
// export const getOrder = (number: number) => createSelector(
//     (state: RootState) => ({
//         orders: state.ordersFeed.ordersMap,
//         profileOrders: state.profileOrders.ordersMap,
//         order: state.orderInfo.order
//     }),
//     ({ orders, profileOrders, order }): Order | undefined => {
//         const foundOrder = orders?.[number] || profileOrders?.[number] || order;
//
//         if (!foundOrder) {
//             return undefined;
//         }
//         return foundOrder as Order;
//     }
// );

const selectOrders = (state: RootState) => state.ordersFeed.ordersMap;
const selectProfileOrders = (state: RootState) => state.profileOrders.ordersMap;
// const selectOrder = (state: RootState) => state.orderInfo.order;

export const getOrder = (number: number) => createSelector(
    [selectOrders, selectProfileOrders, selectOrder],
    (orders, profileOrders, order): Order | undefined => {
        // Use the values from the individual selectors
        const foundOrder = orders?.[number] || profileOrders?.[number] || order;

        return foundOrder as Order;
    }
);