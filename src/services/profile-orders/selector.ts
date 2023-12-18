import {RootState} from "../store";
import {Order, websocketStatuses} from "../../utils/types";

export const selectProfileOrders = (state: RootState): Order[] => state.profileOrders.orders;
export const selectProfileStatus = (state: RootState): websocketStatuses => state.profileOrders.status;
export const selectProfileConnectingError = (state: RootState): string => state.profileOrders.connectingError;
export const selectProfileIsInitialDataLoaded = (state: RootState): boolean => state.profileOrders.isInitialDataLoaded;