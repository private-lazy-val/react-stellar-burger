import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api";

export const loadAllIngredients = createAsyncThunk(
    "burgerIngredients/loadIngredients",
    async () => {
        const response = await api.get('/inredients');
        // Response object is `response` and its body is `response.data`
        // Axios provides the body of the HTTP response in the `data` property of the response object
        // No need to check for `response.ok` with Axios, unsuccessful non-2xx status code requests will throw an error, and that error will be caught in the catch block
        const data = response.data;
        // First check if data.success is true, and then verify the nested data property has content
        if (data.success && data.data.length > 0) {
            return data;
        } else {
            throw new Error('Data format is incorrect or array is empty'); // Will be caught by catch block
        }
        // Doing return rejectWithValue(errorPayload) will cause the rejected action to use that value as action.payload.
    }
);

export const burgerIngredientsSlice = createSlice({
    name: "burgerIngredients",
    initialState: {
        ingredients: [],
        currentTab: 'Булки',
        isLoading: true,
        hasError: false,
    },
    reducers: {
        switchTab: (state, action) => {
            state.currentTab = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllIngredients.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadAllIngredients.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.ingredients = action.payload.data;
            })
            .addCase(loadAllIngredients.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
});

export const {switchTab} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
