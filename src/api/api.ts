export const BASE_URL = "https://norma.nomoreparties.space/api";

type ApiResponse<T> = {
    success: boolean;
    orders: T[];
};
const checkResponse = <T>(res: Response): Promise<ApiResponse<T>> => {
    if (res.ok) { // checks HTTP response status
        return res.json();
    }
    return Promise.reject(`Error fetching data: ${res.status}`);
};

const checkSuccess = <T>(res: ApiResponse<T>): Promise<ApiResponse<T>> => {
    if (res && res.success) {
        return Promise.resolve(res);
    }
    return Promise.reject(`Response to success check: ${res}`);
};

const request = <T>(endpoint: string): Promise<ApiResponse<T>> => {
    return fetch(`${BASE_URL}${endpoint}`)
        .then((res) => checkResponse<T>(res))
        .then((res) => checkSuccess<T>(res));
};

export default request;
