import {setCredentials, logOut} from "../../services/auth/authSlice";
import {BASE_URL} from "./api";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {getCookie} from "../../utils/cookie-utils";

export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    // credentials: 'include', // 'include' means that cookies and session data will be sent and received across origins.
    prepareHeaders: (headers, {getState}) => {
        console.log(getState)
        const accessToken = getState().auth.accessToken;
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        return headers;
    }
});

export const getNewAccessToken = (refreshToken) => {
    return fetch(`${BASE_URL}auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ 'token': refreshToken })
    });
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // token expired (403 forbidden)
    if (result?.error?.data?.message === "jwt expired") {
        console.log('sending refresh token');
        // send refresh token to get new access token
        // const refreshToken = api.getState().auth.refreshToken;
        const refreshToken = getCookie("refreshToken");
        const refreshResults = await getNewAccessToken(refreshToken);
        if (refreshResults?.data?.accessToken) {
            const user = api.getState().auth.user;
            // store the new access token
            api.dispatch(setCredentials({...refreshResults.data, user}));

            // retry the origin query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut);
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

