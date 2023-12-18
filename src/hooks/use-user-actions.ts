import { useDispatch } from '../services/store';
import { logout } from '../services/user/action';
import {resetOrders} from "../services/profile-orders/actions";
import {SetActiveSection} from "../utils/types";

export const useUserActions = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(resetOrders());
    }

    const setActive = ({ isActive }: SetActiveSection) => isActive
        ? 'text text_type_main-medium'
        : 'text text_type_main-medium text_color_inactive';

    return { onLogout, setActive };
};