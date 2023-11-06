import { useDispatch } from 'react-redux';
import { logout } from '../services/user/action';
import {resetOrders} from "../services/profile-orders/actions";

export const useUserActions = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(resetOrders());
    }

    const setActive = ({isActive}) => isActive
        ? 'text text_type_main-medium'
        : 'text text_type_main-medium text_color_inactive';

    return { onLogout, setActive };
};