import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import request from "../../api/api";
import {Order} from "../../utils/types";

type OrderApiResponse = {
    success: boolean;
    orders: Order[];
};

type OrderState = {
    order: Order | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: OrderState = {
    order: null,
    status: 'idle',
    error: null,
};

export const fetchOrder = createAsyncThunk<Order, string, { rejectValue: string }>(
    "ordersFeed/fetchOrder",
    async (orderNumber, thunkAPI) => {
        try {
            const res = await request<OrderApiResponse>(`/orders/${orderNumber}`);
            return res.orders[0];
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
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.order = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchOrder.rejected, (state, action: PayloadAction<string>) => {
                state.order = null;
                state.status = 'failed';
                state.error = action.payload;
            })
    }
});

export default orderInfoSlice.reducer;