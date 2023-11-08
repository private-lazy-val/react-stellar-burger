import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchWithRefresh} from "../../utils/user-api";
import {getDefaultHeaders} from "../../utils/headers";
import {BASE_URL} from "../../api/api";

export const createNewOrder = createAsyncThunk(
    "submitOrder/createNewOrder",
    async (newOrder) => {
        const endpoint = `${BASE_URL}/orders`;
        const options = {
            method: 'POST',
            headers: getDefaultHeaders(),
            body: JSON.stringify(newOrder)
        };
        const response = await fetchWithRefresh(endpoint, options);

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
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewOrder.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createNewOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.number = action.payload;
            })
            .addCase(createNewOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export default submitOrderSlice.reducer;