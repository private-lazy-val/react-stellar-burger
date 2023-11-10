import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import request from "../../api/api";

export const loadAllIngredients = createAsyncThunk(
    "burgerIngredients/loadAllIngredients",
    async () => {
        const res = await request('/ingredients'); // GET is used by default
        if (res.data && res.data.length > 0) {
            // "map" starts off as an empty object {}
            // and by the end of the .reduce() execution,
            // it becomes an object with properties corresponding to each ingredient's _id
            const ingredientsMap = res.data.reduce((map, ingredient) => {
                const { _id, ...restOfProperties } = ingredient;
                map[_id] = restOfProperties;
                return map;
            }, {});
            return {
                map: ingredientsMap,
                array: res.data,
            };
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
        ingredientsMap: {},
        currentTab: 'Булки',
        status: 'idle',
        error: null,
    },
    reducers: {
        switchTab: (state, action) => {
            state.currentTab = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllIngredients.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadAllIngredients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.ingredients = action.payload.array;
                state.ingredientsMap = action.payload.map;
            })
            .addCase(loadAllIngredients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
});

export const {switchTab} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
