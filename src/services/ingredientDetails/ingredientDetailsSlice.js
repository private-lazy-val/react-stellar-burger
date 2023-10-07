import {createSlice} from '@reduxjs/toolkit';

export const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState: null,
    reducers: {
        showDetails: (state, action) => action.payload
    },
});

export default ingredientDetailsSlice.reducer;
export const {showDetails} = ingredientDetailsSlice.actions;

