import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {AsyncThunkStatuses} from "../../enums";

export const selectOrder = (state: RootState): Order | null => state.orderInfo.order;
export const selectOrderStatus = (state: RootState): AsyncThunkStatuses => state.orderInfo.status;
export const selectOrderError = (state: RootState): string | null => state.orderInfo.error;

const selectOrders = (state: RootState): OrdersMap | null => state.ordersFeed.ordersMap;
const selectProfileOrders = (state: RootState): OrdersMap | null => state.profileOrders.ordersMap;
// const selectOrder = (state: RootState) => state.orderInfo.order;

export const getOrder = (number: number) => createSelector(
    [selectOrders, selectProfileOrders, selectOrder],
    (orders, profileOrders, order): Order | undefined => {
        // Use the values from the individual selectors
        const foundOrder = orders?.[number] || profileOrders?.[number] || order;

        return foundOrder as Order;
    }
);