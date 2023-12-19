import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum ModalTypes {
    Ingredient = 'ingredient',
    Order = 'order',
    SubmitOrder = 'submit-order'
}

export type ModalState = {
    modalType: ModalTypes | null
}

const initialState: ModalState = {
    modalType: null
};
export const ModalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalType: (state, action: PayloadAction<ModalTypes | null>) => {
            state.modalType = action.payload;
        }
    }
});

type TModalActionCreators = typeof ModalSlice.actions;
export type TModalActions = ReturnType<TModalActionCreators[keyof TModalActionCreators]>;

export default ModalSlice.reducer;
export const {setModalType} = ModalSlice.actions;
