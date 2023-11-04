import {createSlice, nanoid} from '@reduxjs/toolkit';

export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState: {
        bun: null,
        ingredients: [],
        isLoading: false,
        hasError: false,
    },
    reducers: {
        addBun: {
            reducer(state, action) {
                state.bun = action.payload;
            },
            prepare(ingredient) {
                return {
                    payload: {...ingredient, uuid: nanoid()}
                }
            }
        },
        addIngredient: {
            reducer(state, action) {
                state.ingredients.push(action.payload);
            },
            prepare(ingredient) {
                return {
                    payload: {...ingredient, uuid: nanoid()}
                }
            }
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid);
        },
        resetConstructor: (state) => {
            state.bun = null;
            state.ingredients = [];
        },
        moveIngredients: (state, action) => {
            const {fromIndex, toIndex} = action.payload;
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
    resetConstructor
} = burgerConstructorSlice.actions;
