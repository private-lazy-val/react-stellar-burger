import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAccessToken, setUser, setAuthChecked} from "./user-slice";
import {ServerBasicResponse, updateStateWithRefreshToken, userApi} from "../../utils/user-api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";
import {selectAccessToken} from "./selector";
import {User} from "../../utils/types";
import {AppDispatch, RootState} from "../store";

export const getUser = createAsyncThunk<User, void, { state: RootState, rejectValue: string }>(
    "user/getUser",
    async (_, { getState, dispatch, rejectWithValue }) => {
        let accessToken = selectAccessToken(getState());
        if (!accessToken) {
            try {
                await updateStateWithRefreshToken(dispatch);
                accessToken = selectAccessToken(getState());
            } catch (err) {
                return rejectWithValue("Token refresh failed");
            }
        }
        try {
            const res = await userApi.getUser(accessToken, dispatch);
            if (res.success) {
                dispatch(setUser(res.user));
            } else {
                return rejectWithValue(res.message || "Failed to fetch user data");
            }
        } catch (error) {
            return rejectWithValue(error.message || "Error during user data fetch");
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData, thunkAPI) => {
        let accessToken = selectAccessToken(thunkAPI.getState());
        if (!accessToken) {
            try {
                await updateStateWithRefreshToken(thunkAPI.dispatch);
                accessToken = selectAccessToken(thunkAPI.getState());
            } catch (err) {
                return thunkAPI.rejectWithValue("Token refresh failed");
            }
        }
        try {
            const res = await userApi.updateUser(userData, accessToken);
            if (!res.success) {
                return thunkAPI.rejectWithValue(res.message || "User update failed");
            }
            return res.user;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error during user update");
        }
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (userData, thunkAPI) => {
        try {
            const res = await userApi.login(userData);
            if (res.success) {
                setCookie('refreshToken', res.refreshToken);
                thunkAPI.dispatch(setAccessToken(res.accessToken.split('Bearer ')[1]));
                return res.user;
            } else {
                // Handle unsuccessful login attempt
                return thunkAPI.rejectWithValue(res.message || "Login failed");
            }
        } catch (err) {
            // Handle other types of errors (e.g., network issues)
            return thunkAPI.rejectWithValue(err.message || "An error occurred during login");
        }
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (userData, thunkAPI) => {
        try {
            const res = await userApi.register(userData);
            if (res.success) {
                setCookie('refreshToken', res.refreshToken);
                thunkAPI.dispatch(setAccessToken(res.accessToken.split('Bearer ')[1]));
                return res.user;
            } else {
                return thunkAPI.rejectWithValue(res.message || "Registration failed");
            }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "An error occurred during registration");
        }
    }
);

export const checkUserAuth = createAsyncThunk(
    "user/checkUserAuth",
    async (_, thunkAPI) => {
        let accessToken = selectAccessToken(thunkAPI.getState());
        // If accessToken is not available, try refreshing it
        if (!accessToken) {
            try {
                await updateStateWithRefreshToken(thunkAPI.dispatch);
                accessToken = selectAccessToken(thunkAPI.getState());
            } catch (err) {
                thunkAPI.dispatch(logout());
                thunkAPI.dispatch(setAuthChecked(true));
                return thunkAPI.rejectWithValue("Failed to refresh token");
            }
        }
        // If accessToken is available after refresh (or was initially available)
        if (accessToken) {
            try {
                await thunkAPI.dispatch(getUser());
            } catch (error) {
                // Handle errors in getUser
                thunkAPI.dispatch(logout());
                return thunkAPI.rejectWithValue("Error during user data fetch");
            }
        }
        // Mark auth check as completed
        thunkAPI.dispatch(setAuthChecked(true));
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await userApi.logout(getCookie("refreshToken"));
        deleteCookie("refreshToken");
    }
);

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email, thunkAPI) => {
        try {
            const res = await userApi.forgotPassword(email);
            if (res.success) return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Password reset failed");
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (userData, thunkAPI) => {
        try {
            const res = await userApi.resetPassword(userData);
            if (res.success) return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Password reset failed");
        }
    }
);
