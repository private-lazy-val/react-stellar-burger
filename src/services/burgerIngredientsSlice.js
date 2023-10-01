import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api/api";

export const loadAllIngredients = createAsyncThunk(
    "burgerIngredients/loadIngredients",
    async () => {
        try {
            const response = await api.get('/ingredients');
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
        } catch (err) {
            console.error('Error occurred:', err);
            throw err; // Re-throwing the error to ensure it gets captured by Redux Toolkit
        }
    }
);

/* Slice object */
export const burgerIngredientsSlice = createSlice({
    name: "burgerIngredients",
    initialState: {
        ingredients: [],
        isLoading: false,
        hasError: false,
    },
    reducers: {},
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

export default burgerIngredientsSlice.reducer;
export const selectIngredients = (state) => state.burgerIngredients.ingredients;
export const isLoadingIngredients = (state) => state.burgerIngredients.isLoading;
export const hasErrorIngredients = (state) => state.burgerIngredients.hasError;
