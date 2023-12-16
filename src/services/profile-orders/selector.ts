import {RootState} from "../store";

export const selectProfileOrders = (state: RootState) => state.profileOrders.orders;
export const selectProfileStatus = (state: RootState) => state.profileOrders.status;
export const selectProfileConnectingError = (state: RootState) => state.profileOrders.connectingError;
export const selectProfileisInitialDataLoaded = (state: RootState) => state.profileOrders.isInitialDataLoaded;