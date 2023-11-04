import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from "../../api/api";

export const fetchAllUserOrders = createAsyncThunk(
    "userOrders/fetchAllUserOrders",
    async () => {
        return await request('/orders');
    }
);

export const userOrdersSlice = createSlice({
    name: "userOrders",
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
            .addCase(fetchAllUserOrders.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchAllUserOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.orders = action.payload.orders;
                state.total =  action.payload.total;
                state.totalToday =  action.payload.totalToday;
            })
            .addCase(fetchAllUserOrders.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
});

export default userOrdersSlice.reducer;