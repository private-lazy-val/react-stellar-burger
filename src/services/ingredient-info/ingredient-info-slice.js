import {createSlice} from '@reduxjs/toolkit';

export const ingredientInfoSlice = createSlice({
    name: "ingredientInfo",
    initialState: null,
    reducers: {
        showIngredientInfo: (state, action) => action.payload
    },
});

export default ingredientInfoSlice.reducer;
export const {showIngredientInfo} = ingredientInfoSlice.actions;

