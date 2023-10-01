import {createSlice} from '@reduxjs/toolkit';

export const ModalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        modalType: null
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setModalType: (state, action) => {
            state.modalType = action.payload;
        }
    }
});

export default ModalSlice.reducer;
export const {openModal, closeModal, setModalType} = ModalSlice.actions;
