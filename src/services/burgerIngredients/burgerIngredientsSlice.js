import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import request from "../../app/api/api";

export const loadAllIngredients = createAsyncThunk(
    "burgerIngredients/loadIngredients",
    async () => {
        const response = await request('/ingredients'); // GET is used by default
        if (response.data && response.data.length > 0) {
            return response.data;
        } else {
            throw new Error('Data format is incorrect or array is empty');
        }
        // No need to catch errors, all errors caught by createAsyncThunk will be passed to action.error in the rejected case
    }
);

export const burgerIngredientsSlice = createSlice({
    name: "burgerIngredients",
    initialState: {
        ingredients: [],
        currentTab: 'Булки',
        isLoading: false,
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
                state.ingredients = action.payload;
            })
            .addCase(loadAllIngredients.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
});

export const {switchTab} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
