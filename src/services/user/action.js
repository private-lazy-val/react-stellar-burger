import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked, setUserLoading} from "./user-slice";
import {userApi} from "../../utils/user-api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";

export const getUser = () => {
    return (dispatch) => {
        dispatch(setUserLoading(true));
        return userApi.getUser().then((res) => {
            dispatch(setUser(res.user));
            dispatch(setUserLoading(false));
        });
    };
};

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData) => {
        const res = await userApi.updateUser(userData);
        if (!res.success) {
            throw new Error(res.message || "User update failed");
        }
        return res.user;
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (userData) => {
        const res = await userApi.login(userData);
        if (!res.success) {
            throw new Error(res.message || "Login failed");
        }
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        return res.user;
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (userData) => {
        const res = await userApi.register(userData);
        if (!res.success) {
            throw new Error(res.message || "Registration failed");
        }
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        return res.user;
    }
);

export const checkUserAuth = () => {
    return (dispatch) => {
        if (getCookie("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    // deleteCookie("accessToken");
                    // deleteCookie("refreshToken");
                    // use reducers when you have direct, synchronous updates to the state
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await userApi.logout(getCookie("refreshToken"));
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
    }
);

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email) => {
        const res = await userApi.forgotPassword(email);
        if (!res.success) {
            throw new Error(res.message || "Password reset failed");
        }
        return res;
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (userData) => {
        const res = await userApi.resetPassword(userData);
        if (!res.success) {
            throw new Error(res.message || "Password reset failed");
        }
        return res;
    }
);
