import {createSlice} from "@reduxjs/toolkit";
import {login, register, logout, forgotPassword, resetPassword, updateUser, getUser} from "./action";

const initialState = {
    user: null,
    isAuthChecked: false,
    errMsg: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        resetError: (state) => {
            state.errMsg = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.errMsg = action.error.message;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.errMsg = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthChecked = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.errMsg = action.error.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.errMsg = action.error.message;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.errMsg = action.error.message;
            })
    }
});

export const {setAuthChecked, setUser, resetError} = userSlice.actions;

export default userSlice.reducer;
