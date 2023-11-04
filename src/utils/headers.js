import {getCookie} from "./cookies";

export const getDefaultHeaders = (isAuthRequired = true) => {
    const headers = {
        "Content-Type": "application/json;charset=utf-8",
    };

    if (isAuthRequired) {
        headers["Authorization"] = 'Bearer ' + getCookie('accessToken');
    }

    return headers;
};