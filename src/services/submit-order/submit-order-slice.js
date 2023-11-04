import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from "../../api/api";

export const fetchOrderId = createAsyncThunk(
    "submitOrder/fetchOrderId",
    async (newOrder) => {
        const endpoint = '/orders';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        };
        const response = await request(endpoint, options);

        if (response.success && response.order.number) {
            return response.order.number;
        } else {
            throw new Error('The \'number\' field is missing or empty.');
        }
        // No need to catch errors, all errors caught by createAsyncThunk will be passed to action.error in the rejected case
    }
);

export const submitOrderSlice = createSlice({
    name: "submitOrder",
    initialState: {
        number: null,
        isLoading: true,
        hasError: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderId.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchOrderId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.number = action.payload;
            })
            .addCase(fetchOrderId.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
});

export default submitOrderSlice.reducer;