import {BASE_URL} from "../app/api/api";
import {getCookie, setCookie} from "./cookie";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
    const res = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: getCookie("refreshToken"),
        }),
    });
    return checkResponse(res);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            setCookie("refreshToken", refreshData.refreshToken);
            setCookie("accessToken", refreshData.accessToken.replace('Bearer ', ''));
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

const getUser = () =>
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": 'Bearer ' + getCookie('accessToken')
        }
    });

const updateUser = (userData) =>
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(userData)
    });

const login = async (userData) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userData)
    });
    return await checkResponse(res);
}

const register = async (userData) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userData)
    });
    return await checkResponse(res);
}

const logout = async (refreshToken) => {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({token: refreshToken})
    });
    return await checkResponse(res);
}

// provide email
const forgotPassword = async (email) => {
    const res = await fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(email)
    });
    return await checkResponse(res);
}

//provide password and token from an email
const resetPassword = async (userData) => {
    const res = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userData)
    });
    return await checkResponse(res);
}

export const api = {
    getUser,
    updateUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword
};
