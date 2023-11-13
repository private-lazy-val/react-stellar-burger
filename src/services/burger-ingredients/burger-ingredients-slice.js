import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import request from "../../api/api";

export const loadAllIngredients = createAsyncThunk(
    "burgerIngredients/loadAllIngredients",
    async (_, thunkAPI) => {
        try {
            const res = await request('/ingredients'); // GET is used by default
            if (res.data && res.data.length > 0) {
                // "map" starts off as an empty object {}
                // and by the end of the .reduce() execution,
                // it becomes an object with properties corresponding to each ingredient's _id
                const ingredientsMap = res.data.reduce((map, ingredient) => {
                    const {_id, ...restOfProperties} = ingredient;
                    map[_id] = restOfProperties;
                    return map;
                }, {});
                return {
                    map: ingredientsMap,
                    array: res.data,
                };
            } else {
                // Handle empty or invalid data
                return thunkAPI.rejectWithValue('No ingredients found or invalid data format');
            }
        } catch (err) {
            return thunkAPI.rejectWithValue('Failed to fetch ingredients');
        }
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
                state.error = action.payload;
            })
    }
});

export const {switchTab} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
