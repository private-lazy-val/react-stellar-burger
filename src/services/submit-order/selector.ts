import {RootState} from "../store";
import {AsyncThunkStatuses} from "../../enums";

export const selectOrderNumber = (state: RootState): number | null => state.submitOrder.number;
export const selectOrderNumberStatus = (state: RootState): AsyncThunkStatuses => state.submitOrder.status;
export const selectOrderNumberError = (state: RootState): string | null => state.submitOrder.error;