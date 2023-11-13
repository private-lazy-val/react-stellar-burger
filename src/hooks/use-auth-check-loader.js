import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from '../services/user/action';
import {selectAuthCheckLoading, selectAuthStatus} from "../services/user/selector";

export const useAuthCheckLoader = () => {
    const isAuthChecked = useSelector(selectAuthStatus);
    const isAuthCheckLoading = useSelector(selectAuthCheckLoading);
    console.log(isAuthCheckLoading)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthChecked && !isAuthCheckLoading) {
            dispatch(checkUserAuth());
        }
    }, [dispatch, isAuthChecked, isAuthCheckLoading]);

    return isAuthCheckLoading;
};