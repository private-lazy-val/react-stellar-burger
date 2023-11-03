import {createSlice} from '@reduxjs/toolkit';

export const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState: null,
    reducers: {
        showIngredientDetails: (state, action) => action.payload
    },
});

export default ingredientDetailsSlice.reducer;
export const {showIngredientDetails} = ingredientDetailsSlice.actions;

