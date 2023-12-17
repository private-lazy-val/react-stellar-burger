import {RootState} from "../store";

export const selectOrderNumber = (state: RootState) => state.submitOrder.number;
export const selectOrderNumberStatus = (state: RootState) => state.submitOrder.status;
export const selectOrderNumberError = (state: RootState) => state.submitOrder.error;