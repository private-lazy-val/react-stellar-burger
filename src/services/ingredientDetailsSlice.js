import {createSlice} from '@reduxjs/toolkit';

/* Slice object */
export const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState: null,
    reducers: {
        showDetails: (state, action) => action.payload,
        hideDetails: () => null,
    },
});

export default ingredientDetailsSlice.reducer;
export const {showDetails, hideDetails} = ingredientDetailsSlice.actions;
export const getIngredient = (state) => state.ingredientDetails;
