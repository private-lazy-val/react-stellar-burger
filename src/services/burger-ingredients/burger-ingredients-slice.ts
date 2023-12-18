import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import request from "../../api/api";
import {AsyncThunkStatuses, BaseIngredient, IngredientsMap, IngredientsTypes} from "../../utils/types";
import {RootState} from "../store";
type IngredientsResponse = {
    data: BaseIngredient[];
};

type FulfilledPayload = {
    map: IngredientsMap;
    array: BaseIngredient[];
};

export const loadAllIngredients = createAsyncThunk<FulfilledPayload, void, {
    state: RootState,
    rejectValue: string
}>(
    "burgerIngredients/loadAllIngredients",
    async (_, {rejectWithValue}) => {
        try {
            const res = await request<IngredientsResponse>('/ingredients'); // GET is used by default
            if (res.data && res.data.length > 0) {
                // "map" starts off as an empty object {}
                // and by the end of the .reduce() execution,
                // it becomes an object with properties corresponding to each ingredient's _id
                const ingredientsMap = res.data.reduce((map: IngredientsMap, ingredient: BaseIngredient): IngredientsMap => {
                    const {_id, ...restOfProperties} = ingredient;
                    map[_id] = restOfProperties;
                    return map;
                }, {} as IngredientsMap);
                return {
                    map: ingredientsMap,
                    array: res.data,
                };
            } else {
                // Handle empty or invalid data
                return rejectWithValue('No ingredients found or invalid data format');
            }
        } catch (err) {
            return rejectWithValue('Failed to fetch ingredients');
        }
    }
);

export type BurgerIngredientsState = {
    ingredients: BaseIngredient[],
    ingredientsMap: IngredientsMap,
    currentTab: IngredientsTypes,
    status: AsyncThunkStatuses,
    error: string | null,
}

const initialState: BurgerIngredientsState = {
    ingredients: [],
    ingredientsMap: {},
    currentTab: IngredientsTypes.Buns,
    status: AsyncThunkStatuses.idle,
    error: null,
};

export const burgerIngredientsSlice = createSlice({
    name: "burgerIngredients",
    initialState,
    reducers: {
        switchTab: (state, action: PayloadAction<IngredientsTypes>) => {
            state.currentTab = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAllIngredients.pending, (state) => {
                state.status = AsyncThunkStatuses.loading;
                state.error = null;
            })
            .addCase(loadAllIngredients.fulfilled, (state, action: PayloadAction<FulfilledPayload>) => {
                state.status = AsyncThunkStatuses.succeeded;
                state.error = null;
                state.ingredients = action.payload.array;
                state.ingredientsMap = action.payload.map;
            })
            .addCase(loadAllIngredients.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = AsyncThunkStatuses.failed;
                state.error = action.payload ?? 'Unknown error';
            })
    }
});

type TBurgerIngredientsActionCreators = typeof burgerIngredientsSlice.actions;
export type TBurgerIngredientsActions = ReturnType<TBurgerIngredientsActionCreators[keyof TBurgerIngredientsActionCreators]>;
export const {switchTab} = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;
