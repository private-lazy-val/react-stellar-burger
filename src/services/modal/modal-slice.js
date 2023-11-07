import {createSlice} from '@reduxjs/toolkit';

export const ModalSlice = createSlice({
    name: "modal",
    initialState: {
        modalType: null
    },
    reducers: {
        closeModal: (state) => {
            state.isOpen = false;
        },
        setModalType: (state, action) => {
            state.modalType = action.payload;
        }
    }
});

export default ModalSlice.reducer;
export const {closeModal, setModalType} = ModalSlice.actions;
