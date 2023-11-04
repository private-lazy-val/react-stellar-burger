export const BASE_URL = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
    if (res.ok) { // checks HTTP response status
        return res.json();
    }
    return Promise.reject(`Error fetching data: ${res.status}`);
};

const checkSuccess = (res) => {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Response to success check: ${res}`);
};

const request = (endpoint, options) => {
    return fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);
};

export default request;
