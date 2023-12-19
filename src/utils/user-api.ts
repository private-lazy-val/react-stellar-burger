import {BASE_URL} from "../api/api";
import {getCookie, setCookie} from "./cookies";
import {getDefaultHeaders} from "./headers";
import {setAccessToken} from "../services/user/user-slice";
import {Dispatch} from "redux";

export type ServerBasicResponse<T = {}> = T & {
    message?: string,
    success: boolean
};

export type TokenData = {
    accessToken: string;
    refreshToken: string;
};

export type UserData = {
    user: User;
}

export type RegisterData = UserData & TokenData;

type FetchOptions = RequestInit & {
    headers: HeadersInit
};

const checkResponse = async<T>(res: Response): Promise<ServerBasicResponse<T>> => {
    // return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    if (res.ok) {
        return await res.json();
    } else {
        const errorResponse = await res.json();
        return Promise.reject(new Error(errorResponse.message || 'An unknown error occurred'));
    }
};

export const refreshToken = async (): Promise<ServerBasicResponse<TokenData>> => {
    try {
        const res = await fetch(`${BASE_URL}/auth/token`, {
            method: "POST",
            headers: getDefaultHeaders(false),
            body: JSON.stringify({token: getCookie("refreshToken")}),
        });
        return await checkResponse(res);
    } catch (error) {
        throw error;
    }
};

export const fetchWithRefresh = async <T>(url: string, options: FetchOptions, dispatch: Dispatch): Promise<ServerBasicResponse<T>> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err instanceof Error && err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            if (!refreshData || !refreshData.success) {
                console.error((err.message || "Failed to refresh token"));
            }
            setCookie("refreshToken", refreshData.refreshToken);
            dispatch(setAccessToken(refreshData.accessToken.split('Bearer ')[1]));
            // Replace the old Authorization header with the new token
            options.headers = {
                ...options.headers,
                "Authorization": refreshData.accessToken
            };
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            throw err;
        }
    }
};

export const updateStateWithRefreshToken = async (dispatch: Dispatch): Promise<TokenData | void> => {
    try {
        const refreshData = await refreshToken();
        if (refreshData && refreshData.accessToken) {
            dispatch(setAccessToken(refreshData.accessToken.split('Bearer ')[1]));
            setCookie("refreshToken", refreshData.refreshToken);
            return refreshData;
        } else {
            console.error("Failed to refresh token");
        }
    } catch (error) {
    }
};

const getUser = ({accessToken}: Pick<TokenData, "accessToken">, dispatch: Dispatch): Promise<ServerBasicResponse<UserData>> =>
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: getDefaultHeaders(true, accessToken),
    }, dispatch);

const updateUser = (userData: User,
                    {accessToken}: Pick<TokenData, "accessToken">, dispatch: Dispatch): Promise<ServerBasicResponse<UserData>> =>
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: getDefaultHeaders(true, accessToken),
        body: JSON.stringify(userData)
    }, dispatch);

const login = async (userData: User): Promise<ServerBasicResponse<RegisterData>> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: getDefaultHeaders(false),
        body: JSON.stringify(userData)
    });
    return await checkResponse(res);
}

const register = async (userData: User): Promise<ServerBasicResponse<RegisterData>> => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: getDefaultHeaders(false),
        body: JSON.stringify(userData)
    });
    return await checkResponse(res);
}

const logout = async ({refreshToken}: Pick<TokenData, "refreshToken">): Promise<ServerBasicResponse> => {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: getDefaultHeaders(false),
        body: JSON.stringify({token: refreshToken})
    });
    return await checkResponse(res);
}

// provide email
const forgotPassword = async ({email}: Pick<User, "email">): Promise<ServerBasicResponse> => {
    const res = await fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: getDefaultHeaders(false),
        body: JSON.stringify({email})
    });
    return await checkResponse(res);
}

//provide password and token from an email
const resetPassword = async (userData: ResetPassword): Promise<ServerBasicResponse> => {
    const res = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: getDefaultHeaders(false),
        body: JSON.stringify(userData)
    });
    return await checkResponse(res);
}

export const userApi = {
    getUser,
    updateUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword
};
