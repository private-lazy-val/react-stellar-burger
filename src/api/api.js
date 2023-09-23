import axios from 'axios';

const api = axios.create({
    baseURL: "https://norma.nomoreparties.space/api"
});

export default api;