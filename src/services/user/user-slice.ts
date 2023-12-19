import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, register, logout, forgotPassword, resetPassword, updateUser, checkUserAuth} from "./action";
import {User} from "../../utils/types";

export type UserState = {
    user: User | null;
    accessToken: string | null;
    isAuthChecked: boolean;
    authCheckLoading: boolean;
    isLoading: boolean;
    errMsg: string | null;
}

const initialState: UserState = {
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
        setAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        setUserLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        resetError: (state) => {
            state.errMsg = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.errMsg = action.payload || 'Error during login';
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.isAuthChecked = true;
            })
            .addCase(register.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.errMsg = action.payload || 'Error during registration';
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthChecked = true;
                state.accessToken = null;
            })
            .addCase(forgotPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.errMsg = action.payload || 'Error during password recovery';
            })
            .addCase(resetPassword.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.errMsg = action.payload || 'Error during password reset';
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action: PayloadAction<string | undefined>) => {
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

type TUserActionCreators = typeof userSlice.actions;
export type TUserActions = ReturnType<TUserActionCreators[keyof TUserActionCreators]>;

export const {setAuthChecked, setAccessToken, setUserLoading, setUser, resetError} = userSlice.actions;
export default userSlice.reducer;
