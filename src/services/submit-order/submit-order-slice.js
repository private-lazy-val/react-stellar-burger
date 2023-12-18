import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchWithRefresh} from "../../utils/user-api";
import {getDefaultHeaders} from "../../utils/headers";
import {BASE_URL} from "../../api/api";
import {selectAccessToken} from "../user/selector";

export const createNewOrder = createAsyncThunk(
    "submitOrder/createNewOrder",
    async (newOrder, thunkAPI) => {
        let accessToken = selectAccessToken(thunkAPI.getState());

        const endpoint = `${BASE_URL}/orders`;
        const createOrder = async (token) => {
            const options = {
                method: 'POST',
                headers: getDefaultHeaders(undefined, token),
                body: JSON.stringify(newOrder)
            };
            try {
                const response = await fetchWithRefresh(endpoint, options, thunkAPI.dispatch);
                if (response.success && response.order.number) {
                    return response.order.number;
                } else {
                    return thunkAPI.rejectWithValue("Failed to retrieve order number");
                }
            } catch (err) {
                return thunkAPI.rejectWithValue("Failed to submit the order");
            }
        };

        // If accessToken is available after refresh (or was initially available)
        if (accessToken) {
            return await createOrder(accessToken);
        } else {
            return thunkAPI.rejectWithValue("Authentication required");
        }
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
                state.error = action.payload;
            })
    }
});

export default submitOrderSlice.reducer;