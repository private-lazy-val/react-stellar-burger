import {useDispatch} from "../services/store";
import {useEffect, useState} from "react";
import {updateStateWithRefreshToken} from "../utils/user-api";

export const useRefreshToken = (accessToken: string | null): void => {
    const dispatch = useDispatch();
    const [tokenRefreshAttempted, setTokenRefreshAttempted] = useState(false);

    useEffect(() => {
        const refreshTokenIfNeeded = async () => {
            if (!accessToken && !tokenRefreshAttempted) {
                await updateStateWithRefreshToken(dispatch);
                setTokenRefreshAttempted(true);
            }
        };

        refreshTokenIfNeeded();
    }, [accessToken, dispatch, tokenRefreshAttempted]);
};