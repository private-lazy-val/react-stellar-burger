import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';

export type Bun = BaseIngredient;
export type Ingredient = BaseIngredient;

// Define the state type
export type BurgerConstructorState = {
    bun: Bun | null;
    ingredients: Ingredient[];
}
// Define the initial state
const initialState: BurgerConstructorState = {
    bun: null,
    ingredients: []
};
export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        addBun: {
            reducer(state, action: PayloadAction<Bun>) {
                state.bun = action.payload;
            },
            prepare(ingredient: Bun) {
                return {
                    payload: {...ingredient, uuid: nanoid()}
                }
            }
        },
        addIngredient: {
            reducer(state, action: PayloadAction<Ingredient>) {
                state.ingredients.push(action.payload);
            },
            prepare(ingredient: Ingredient) {
                return {
                    payload: {...ingredient, uuid: nanoid()}
                }
            }
        },

        removeIngredient: (state, action: PayloadAction<Pick<BaseIngredient, "uuid">>) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid);
        },
        resetConstructor: (state) => {
            state.bun = null;
            state.ingredients = [];
        },
        moveIngredients: (state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) => {
            const {fromIndex, toIndex} = action.payload;
            state.ingredients.splice(toIndex, 0, state.ingredients.splice(fromIndex, 1)[0]);
        }
    },
});

type TBurgerConstructorActionCreators = typeof burgerConstructorSlice.actions;
export type TBurgerConstructorActions = ReturnType<TBurgerConstructorActionCreators[keyof TBurgerConstructorActionCreators]>;

export default burgerConstructorSlice.reducer;
export const {
    addBun,
    addIngredient,
    removeIngredient,
    moveIngredients,
    resetConstructor
} = burgerConstructorSlice.actions;
