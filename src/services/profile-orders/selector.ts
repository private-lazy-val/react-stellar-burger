import {RootState} from "../store";
import {WebsocketStatuses} from "../../enums";

export const selectProfileOrders = (state: RootState): Order[] => state.profileOrders.orders;
export const selectProfileStatus = (state: RootState): WebsocketStatuses => state.profileOrders.status;
export const selectProfileConnectingError = (state: RootState): string => state.profileOrders.connectingError;
export const selectProfileIsInitialDataLoaded = (state: RootState): boolean => state.profileOrders.isInitialDataLoaded;