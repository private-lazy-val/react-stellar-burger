import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAccessToken, setUser, setAuthChecked} from "./user-slice";
import {updateStateWithRefreshToken, userApi} from "../../utils/user-api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";
import {selectAccessToken} from "./selector";

export const getUser = createAsyncThunk(
    "user/getUser",
    async (accessToken, thunkAPI) => {
        try {
            const res = await userApi.getUser(accessToken, thunkAPI.dispatch);
            if (res.success) {
                thunkAPI.dispatch(setUser(res.user));
            } else {
                return thunkAPI.rejectWithValue(res.message || "Failed to fetch user data");
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Error during user data fetch");
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData, thunkAPI) => {
        let accessToken = selectAccessToken(thunkAPI.getState());
        let tokenRefreshAttempted = false;
        const makeUpdateRequest = async (token) => {
            try {
                const res = await userApi.updateUser(userData, token, thunkAPI.dispatch);
                if (!res.success) {
                    return thunkAPI.rejectWithValue(res.message || "User update failed");
                }
                return res.user;
            } catch (error) {
                return thunkAPI.rejectWithValue("Error during user update");
            }
        };
        if (!accessToken) {
            try {
                await updateStateWithRefreshToken(thunkAPI.dispatch);
                accessToken = selectAccessToken(thunkAPI.getState());
                tokenRefreshAttempted = true;
            } catch (err) {
                return thunkAPI.rejectWithValue("Token refresh failed");
            }
        }
        // If accessToken is available after refresh (or was initially available)
        if (accessToken) {
            return await makeUpdateRequest(accessToken);
        } else {
            // If after the refresh attempt there is still no accessToken
            return thunkAPI.rejectWithValue("Authentication required");
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
        let tokenRefreshAttempted = false;

        const checkAuthRequest = async (token) => {
            try {
                await thunkAPI.dispatch(getUser(token));
            } catch (error) {
                thunkAPI.dispatch(logout());
                thunkAPI.dispatch(setAuthChecked(true));
                return thunkAPI.rejectWithValue("Error during user data fetch");
            }
        };

        // If accessToken is not available, try refreshing it once
        if (!accessToken && !tokenRefreshAttempted) {
            try {
                await updateStateWithRefreshToken(thunkAPI.dispatch);
                accessToken = selectAccessToken(thunkAPI.getState());
                tokenRefreshAttempted = true; // Mark that a token refresh has been attempted
            } catch (err) {
                thunkAPI.dispatch(logout());
                thunkAPI.dispatch(setAuthChecked(true));
                return thunkAPI.rejectWithValue("Failed to refresh token");
            }
        }
        // If accessToken is available after refresh (or was initially available)
        if (accessToken) {
            await checkAuthRequest(accessToken);
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
