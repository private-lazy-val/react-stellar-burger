import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAccessToken, setUser, setAuthChecked} from "./user-slice";
import {ServerBasicResponse, updateStateWithRefreshToken, userApi} from "../../utils/user-api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";
import {selectAccessToken} from "./selector";
import {RootState} from "../store";
import {User} from "../../utils/types";

export const getUser = createAsyncThunk<void, void, {
    state: RootState,
    rejectValue: string
}>(
    "user/getUser",
    async (_, {getState, dispatch, rejectWithValue}) => {
        let accessToken = selectAccessToken(getState());
        if (!accessToken) {
            try {
                await updateStateWithRefreshToken(dispatch);
                accessToken = selectAccessToken(getState());
            } catch (err) {
                return rejectWithValue("Token refresh failed");
            }
        }
        if (accessToken === null) {
            return rejectWithValue("Access token is null");
        }
        try {
            const res = await userApi.getUser({accessToken}, dispatch);
            if (res.success) {
                dispatch(setUser(res.user));
            } else {
                return rejectWithValue(res.message || "Failed to fetch user data");
            }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || "Error during user data fetch");
            } else {
                // Handle the case where the thrown value is not an Error object
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);

export const updateUser = createAsyncThunk<User, User, {
    state: RootState,
    rejectValue: string
}>(
    "user/updateUser",
    async (userData, {getState, dispatch, rejectWithValue}) => {
        let accessToken = selectAccessToken(getState());
        if (!accessToken) {
            try {
                await updateStateWithRefreshToken(dispatch);
                accessToken = selectAccessToken(getState());
            } catch (err) {
                return rejectWithValue("Token refresh failed");
            }
        }
        if (accessToken === null) {
            return rejectWithValue("Access token is null");
        }
        try {
            const res = await userApi.updateUser(userData, {accessToken}, dispatch);
            if (!res.success) {
                return rejectWithValue(res.message || "User update failed");
            }
            return res.user;
        } catch (error) {
            return rejectWithValue("Error during user update");
        }
    }
);

export const login = createAsyncThunk<User, User, {
    state: RootState,
    rejectValue: string
}>(
    "user/login",
    async (userData, {dispatch, rejectWithValue}) => {
        try {
            const res = await userApi.login(userData);
            console.log(res)
            if (res.success) {
                setCookie('refreshToken', res.refreshToken);
                dispatch(setAccessToken(res.accessToken.split('Bearer ')[1]));
                return res.user;
            } else {
                // Handle unsuccessful login attempt
                return rejectWithValue(res.message || "Login failed");
            }
        }catch (error) {
            // Use rejectWithValue for any other errors
            return rejectWithValue("An unknown error occurred");
        }

    }
);

export const register = createAsyncThunk<User, User, {
    state: RootState,
    rejectValue: string
}>(
    "user/register",
    async (userData, {dispatch, rejectWithValue}) => {
        try {
            const res = await userApi.register(userData);
            if (res.success) {
                setCookie('refreshToken', res.refreshToken);
                dispatch(setAccessToken(res.accessToken.split('Bearer ')[1]));
                return res.user;
            } else {
                return rejectWithValue(res.message || "Registration failed");
            }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || "An error occurred during registration");
            } else {
                // Handle the case where the thrown value is not an Error object
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);

export const checkUserAuth = createAsyncThunk<void, void, {
    state: RootState,
    rejectValue: string
}>(
    "user/checkUserAuth",
    async (_, {getState, dispatch, rejectWithValue}) => {
        let accessToken = selectAccessToken(getState());
        // If accessToken is not available, try refreshing it
        if (!accessToken) {
            try {
                await updateStateWithRefreshToken(dispatch);
                accessToken = selectAccessToken(getState());
            } catch (err) {
                dispatch(logout());
                dispatch(setAuthChecked(true));
                return rejectWithValue("Failed to refresh token");
            }
        }
        // If accessToken is available after refresh (or was initially available)
        if (accessToken) {
            try {
                await dispatch(getUser());
            } catch (error) {
                // Handle errors in getUser
                dispatch(logout());
                return rejectWithValue("Error during user data fetch");
            }
        }
        // Mark auth check as completed
        dispatch(setAuthChecked(true));
    }
);

export const logout = createAsyncThunk<void, void, {
    state: RootState,
    rejectValue: string
}>(
    "user/logout",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const refreshToken = getCookie("refreshToken");
            if (refreshToken) {
                await userApi.logout({refreshToken});
            }
            deleteCookie("refreshToken");
            dispatch(setAccessToken(null));
        } catch (error) {
            // Assuming error is of type Error
            if (error instanceof Error) {
                return rejectWithValue(error.message || "Failed to logout");
            }
            return rejectWithValue("An unknown error occurred during logout");
        }
    }
);

export const forgotPassword = createAsyncThunk<ServerBasicResponse, string, {
    state: RootState,
    rejectValue: string
}>(
    "user/forgotPassword",
    async (email, {rejectWithValue}) => {
        try {
            const res = await userApi.forgotPassword({email});
            if (res.success) {
                return res
            } else {
                return rejectWithValue(res.message || "Password forgot unsuccessful");
            }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || "Password forgot failed");
            } else {
                // Handle the case where the thrown value is not an Error object
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);

export const resetPassword = createAsyncThunk<ServerBasicResponse, User, {
    state: RootState,
    rejectValue: string
}>(
    "user/resetPassword",
    async (userData: User, {rejectWithValue}) => {
        try {
            const res = await userApi.resetPassword(userData);
            if (res.success) {
                return res
            } else {
                return rejectWithValue(res.message || "Password reset unsuccessful");
            }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || "Password reset failed");
            } else {
                return rejectWithValue("An unknown error occurred");
            }
        }
    }
);
