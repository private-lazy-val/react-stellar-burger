import { useDispatch } from '../services/store';
import { logout } from '../services/user/action';
import {resetOrders} from "../services/profile-orders/actions";

type userActionsReturnType = {
    onLogout: () => void;
    setActive: ({ isActive }: SetActiveSection) => string;
};

export const useUserActions = (): userActionsReturnType => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        dispatch(resetOrders());
    }

    const setActive = ({ isActive }: SetActiveSection): string => isActive
        ? 'text text_type_main-medium'
        : 'text text_type_main-medium text_color_inactive';

    return { onLogout, setActive };
};