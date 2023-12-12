import {createSlice} from '@reduxjs/toolkit';

export const ModalSlice = createSlice({
    name: "modal",
    initialState: {
        modalType: null
    },
    reducers: {
        setModalType: (state, action) => {
            state.modalType = action.payload;
        }
    }
});

export default ModalSlice.reducer;
export const {setModalType} = ModalSlice.actions;
