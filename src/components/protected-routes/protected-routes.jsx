import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {selectAuthStatus, selectUser} from "../../services/user/selector";

const ProtectedRoutes = ({ onlyUnAuth = false, component }) => {
    const user = useSelector(selectUser);
    const isAuthChecked = useSelector(selectAuthStatus);
    const location = useLocation();

    if (onlyUnAuth && user) {
        // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
        // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user && isAuthChecked) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return component;
};

export const OnlyAuth = ProtectedRoutes;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRoutes onlyUnAuth={true} component={component} />
);
