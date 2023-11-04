import { useDispatch } from 'react-redux';
import { logout } from '../services/user/action';

export const useUserActions = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    }

    const setActive = ({isActive}) => isActive
        ? 'text text_type_main-medium'
        : 'text text_type_main-medium text_color_inactive';

    return { onLogout, setActive };
};