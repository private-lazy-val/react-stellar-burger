import {createSlice} from '@reduxjs/toolkit';

export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: {
        bun: null,
        ingredients: [],
        isLoading: false,
        hasError: false,
    },
    reducers: {
        addBun: (state, action) => {
            state.bun = action.payload;
        },
        addIngredient: (state, action) => {
            state.ingredients.push(action.payload);
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid);
        },
        moveIngredients: (state, action) => {
            const { fromIndex, toIndex } = action.payload;
            state.ingredients.splice(toIndex, 0, state.ingredients.splice(fromIndex, 1)[0]);
        }
    },
});

export default burgerConstructorSlice.reducer;
export const {
    addBun,
    addIngredient,
    removeIngredient,
    moveIngredients,
} = burgerConstructorSlice.actions;
