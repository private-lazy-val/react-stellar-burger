export const getDefaultHeaders = (isAuthRequired = true, accessToken = null) => {
    const headers = {
        "Content-Type": "application/json;charset=utf-8",
    };

    if (isAuthRequired && accessToken) {
        headers["Authorization"] = 'Bearer ' + accessToken;
    }

    return headers;
};