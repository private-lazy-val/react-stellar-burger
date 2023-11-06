import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from "../../api/api";

export const fetchOrder = createAsyncThunk(
    "ordersFeed/fetchOrder",
    async (orderNumber) => {
        const res = await request(`/orders/${orderNumber}`);
        return res.orders[0];
    }
);

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
    initialState: {
        order: null,
        isLoading: false,
        hasError: false
    },
    reducers: {
        showOrderDetails: (state, action) => {
            state.order = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state, action) => {
                state.order = action.payload;
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.order = null;
                state.isLoading = false;
                state.hasError = true;
            })

    }
});

export default orderDetailsSlice.reducer;
export const {showOrderDetails} = orderDetailsSlice.actions;