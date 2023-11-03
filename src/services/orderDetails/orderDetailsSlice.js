import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from "../../api/api";


export const fetchOrderDetails = createAsyncThunk(
    "ordersFeed/fetchOrderDetails",
    async (orderNumber) => {
        const res = await request(`/orders/${orderNumber}`);
        console.log(res)
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
            .addCase(fetchOrderDetails.pending, (state, action) => {
                state.order = action.payload;
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.order = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.order = null;
                state.isLoading = false;
                state.hasError = true;
            })

    }
});

export default orderDetailsSlice.reducer;
export const {showOrderDetails} = orderDetailsSlice.actions;