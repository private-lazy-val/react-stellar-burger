import {createSlice} from '@reduxjs/toolkit';
import {cookieUtils} from "../../utils/cookie-utils";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const {user, accessToken, refreshToken} = action.payload;
            state.user = user;
            state.accessToken = accessToken.split('Bearer ')[1];
            if(refreshToken) {
                state.refreshToken = refreshToken;
                cookieUtils('refreshToken', refreshToken);
            }
        },
        logOut: (state, action) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
})

export const {setCredentials, logOut} = authSlice.actions;
export default authSlice.reducer;

