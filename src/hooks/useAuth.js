import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setCredentials } from '../services/auth/authSlice';
import { getCookie } from '../utils/cookie-utils';
import {selectAccessToken, selectCurrentUser} from '../services/auth/selector';
import {getNewAccessToken} from "../app/api/apiSlice";

function useAuth() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const accessToken = useSelector(selectAccessToken);
    const user = useSelector(selectCurrentUser);

    useEffect(() => {
        async function renewToken() {
            const refreshToken = getCookie('refreshToken');
            if (!accessToken && refreshToken) {
                console.log("I don't have accessToken && have refreshToken")
                try {
                    // Call API to renew the access token using the refresh token
                    const renewedTokens = await getNewAccessToken(refreshToken);
                    console.log(renewedTokens)
                    console.log("bye")
                    dispatch(setCredentials({...renewedTokens.data, user}));
                } catch (error) {
                    // Handle token renewal errors, e.g., navigate to login if renewal fails
                }
            }
            setIsLoading(false);
        }

        renewToken();
    }, [accessToken, dispatch]);

    return { isAuth: !!accessToken, isLoading };
}

export default useAuth;
