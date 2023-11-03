import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from "../../api/api";

export const fetchAllOrders = createAsyncThunk(
    "ordersFeed/fetchAllOrders",
    async () => {
        return await request('/orders/all');
    }
);

export const ordersFeedSlice = createSlice({
    name: "ordersFeed",
    initialState: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.orders = action.payload.orders;
                state.total =  action.payload.total;
                state.totalToday =  action.payload.totalToday;
            })
            .addCase(fetchAllOrders.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
});

export default ordersFeedSlice.reducer;