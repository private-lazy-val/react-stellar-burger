import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from "../../api/api";

export const fetchOrder = createAsyncThunk(
    "ordersFeed/fetchOrder",
    async (orderNumber, thunkAPI) => {
        try {
            const res = await request(`/orders/${orderNumber}`);
            return res.orders[0];
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to get the order");
        }
    }
);

export const orderInfoSlice = createSlice({
    name: "orderInfo",
    initialState: {
        order: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state, action) => {
                state.order = action.payload;
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.order = null;
                state.status = 'failed';
                state.error = action.payload;
            })

    }
});

export default orderInfoSlice.reducer;