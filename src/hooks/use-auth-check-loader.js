import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAuth } from '../services/user/action';
import {selectAuthCheckLoading, selectAuthStatus} from "../services/user/selector";

export const useAuthCheckLoader = () => {
    // isAuthChecked это флаг, показывающий что проверка токена произведена
    // при этом результат этой проверки не имеет значения, важно только,
    // что сам факт проверки имел место.
    const isAuthChecked = useSelector(selectAuthStatus);
    const isAuthCheckLoading = useSelector(selectAuthCheckLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthChecked && !isAuthCheckLoading) {
            dispatch(checkUserAuth());
        }
    }, [dispatch, isAuthChecked, isAuthCheckLoading]);

    return isAuthCheckLoading;
};