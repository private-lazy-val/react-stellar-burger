import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchWithRefresh} from "../../utils/user-api";
import {getDefaultHeaders} from "../../utils/headers";
import {BASE_URL} from "../../api/api";
import {selectAccessToken} from "../user/selector";
import {AsyncThunkStatuses, Order} from "../../utils/types";
import {RootState} from "../store";

export type OrderData = {
    name: string;
    order: Order;
};

export type OrderRequest = {
    ingredients: string[];
}

export const createNewOrder = createAsyncThunk<number, OrderRequest, {
    state: RootState,
    rejectValue: string
}>(
    "submitOrder/createNewOrder",
    async (newOrder, {getState, dispatch, rejectWithValue}) => {
        let accessToken = selectAccessToken(getState());

        const endpoint = `${BASE_URL}/orders`;
        const createOrder = async (accessToken: string) => {
            const options = {
                method: 'POST',
                headers: getDefaultHeaders(undefined, accessToken),
                body: JSON.stringify(newOrder)
            };
            try {
                const response = await fetchWithRefresh<OrderData>(endpoint, options, dispatch);
                if (response.success && response.order.number) {
                    return response.order.number;
                } else {
                    return rejectWithValue("Failed to retrieve order number");
                }
            } catch (err) {
                return rejectWithValue("Failed to submit the order");
            }
        };

        // If accessToken is available after refresh (or was initially available)
        if (accessToken) {
            return await createOrder(accessToken);
        } else {
            return rejectWithValue("Authentication required");
        }
    }
);

export type submitOrder = {
    number: number | null,
    status: AsyncThunkStatuses,
    error: null | string,
}

const initialState: submitOrder = {
    number: null,
    status: AsyncThunkStatuses.idle,
    error: null,
}

export const submitOrderSlice = createSlice({
    name: "submitOrder",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.status = AsyncThunkStatuses.loading;
                state.error = null;
            })
            .addCase(createNewOrder.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = AsyncThunkStatuses.succeeded;
                state.error = null;
                state.number = action.payload;
            })
            .addCase(createNewOrder.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = AsyncThunkStatuses.failed;
                state.error = action.payload || 'An error occurred when submitting the order';
            })
    }
});

export default submitOrderSlice.reducer;