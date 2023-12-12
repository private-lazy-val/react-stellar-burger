import {createSlice} from "@reduxjs/toolkit";
import {login, register, logout, forgotPassword, resetPassword, updateUser, checkUserAuth} from "./action";

const initialState = {
    user: null,
    accessToken: null,
    isAuthChecked: false,
    authCheckLoading: false,
    isLoading: false,
    errMsg: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUserLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.isLoading = false;
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
                state.errMsg = action.payload || 'Error during login';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.errMsg = action.payload || 'Error during registration';
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthChecked = true;
                state.accessToken = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.errMsg = action.payload || 'Error during password recovery';
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.errMsg = action.payload || 'Error during password reset';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.errMsg = action.payload || 'Error during user update';
            })
            .addCase(checkUserAuth.pending, (state) => {
                state.authCheckLoading = true;
            })
            .addCase(checkUserAuth.fulfilled, (state) => {
                state.authCheckLoading = false;
            })
            .addCase(checkUserAuth.rejected, (state) => {
                state.authCheckLoading = false;
            });
    }
});

export const {setAuthChecked, setAccessToken, setUserLoading, setUser, resetError} = userSlice.actions;

export default userSlice.reducer;
