import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from "../../api/api";

export const fetchOrderId = createAsyncThunk(
    "orderDetails/getOrderId",
    async (newOrder) => {
        // Axios will stringify newOrder automatically
            const response = await api.post('/orders', newOrder);
            // Response object is `response` and its body is `response.data`
            // Axios provides the body of the HTTP response in the `data` property of the response object
            // No need to check for `response.ok` with Axios, unsuccessful non-2xx status code requests will throw an error, and that error will be caught in the catch block
            const data = response.data;
            // First check if data exists, then check if data.success is true, and then verify the nested data property has content
            if (data.success && data.order.number) {
                return data.order.number;
            } else {
                throw new Error('The \'number\' field is missing or empty.'); // Will be caught by catch block
            }
            // Doing return rejectWithValue(errorPayload) will cause the rejected action to use that value as action.payload.
    }
);

export const orderDetailsSlice = createSlice({
    name: "orderDetails",
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

export default orderDetailsSlice.reducer;