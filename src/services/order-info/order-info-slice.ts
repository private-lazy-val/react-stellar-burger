import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import request from "../../api/api";
import {AsyncThunkStatuses} from "../../enums";

type OrderResponse = {
    orders: Order[];
};

export type OrderState = {
    order: Order | null;
    status: AsyncThunkStatuses;
    error: string | null;
}

const initialState: OrderState = {
    order: null,
    status: AsyncThunkStatuses.idle,
    error: null,
};

// Action type (in extra reducers) is Order, orderNumber is passed as a string, error is a string
export const fetchOrder = createAsyncThunk<Order, string, { rejectValue: string }>(
    "ordersFeed/fetchOrder",
    async (orderNumber, thunkAPI) => {
        try {
            const res = await request<OrderResponse>(`/orders/${orderNumber}`);
            return res.orders[0] as Order;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to get the order");
        }
    }
);

export const orderInfoSlice = createSlice({
    name: "orderInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.status = AsyncThunkStatuses.loading;
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.order = action.payload;
                state.status = AsyncThunkStatuses.succeeded;
                state.error = null;
            })
            .addCase(fetchOrder.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.order = null;
                state.status = AsyncThunkStatuses.failed;
                state.error = action.payload ?? "An unknown error occurred";
            })
    }
});

export default orderInfoSlice.reducer;