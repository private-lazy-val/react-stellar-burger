type Headers = {
    "Content-Type": string;
    "Authorization"?: string;
}
export const getDefaultHeaders = (isAuthRequired: boolean = true, accessToken: string | null = null): Headers => {
    const headers: Headers = {
        "Content-Type": "application/json;charset=utf-8",
    };

    if (isAuthRequired && accessToken) {
        headers["Authorization"] = 'Bearer ' + accessToken;
    }
    return headers;
};