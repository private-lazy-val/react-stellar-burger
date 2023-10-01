import {createSlice} from '@reduxjs/toolkit';

export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: {
        bun: null,
        ingredients: []
    },
    reducers: {
        addBun: (state, action) => {
            state.bun = action.payload;
        },
        addIngredient: (state, action) => {
            state.ingredients.push(action.payload);
        },
        removeBun: (state) => {
            state.bun = null;
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid);
        },
    },
});

export default burgerConstructorSlice.reducer;
export const {
    addBun,
    addIngredient,
    removeBun,
    removeIngredient,
} = burgerConstructorSlice.actions;
export const getBun = (state) => state.burgerConstructor.bun;
export const getIngredients = (state) => state.burgerConstructor.ingredients;
