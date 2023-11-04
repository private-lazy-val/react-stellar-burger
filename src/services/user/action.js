import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./userSlice";
import {api} from "./api";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";

export const getUser = () => {
    return (dispatch) => {
        return api.getUser().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData) => {
        const res = await api.updateUser(userData);
        if (!res.success) {
            throw new Error(res.message || "User update failed");
        }
        return res.user;
    }
);

export const login = createAsyncThunk(
    "user/login",
    async (userData) => {
        const res = await api.login(userData);
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
        const res = await api.register(userData);
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
                    deleteCookie("accessToken");
                    deleteCookie("refreshToken");
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
        await api.logout(getCookie("refreshToken"));
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
    }
);

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email) => {
        const res = await api.forgotPassword(email);
        if (!res.success) {
            throw new Error(res.message || "Password reset failed");
        }
        return res;
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (userData) => {
        const res = await api.resetPassword(userData);
        if (!res.success) {
            throw new Error(res.message || "Password reset failed");
        }
        return res;
    }
);
