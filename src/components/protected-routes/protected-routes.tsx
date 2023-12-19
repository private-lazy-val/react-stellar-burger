import {useSelector} from "../../services/store";
import {Navigate, useLocation} from "react-router-dom";
import {selectAuthStatus, selectUser} from "../../services/user/selector";
import React, {ReactElement} from "react";

type ProtectedRoutesProps = {
    onlyUnAuth?: boolean;
    component: ReactElement;
}
const ProtectedRoutes = ({onlyUnAuth = false, component}: ProtectedRoutesProps): React.JSX.Element => {
    const user = useSelector(selectUser);
    const isAuthChecked = useSelector(selectAuthStatus);
    const location = useLocation();

    if (onlyUnAuth && user) {
        // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
        // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
        const {from} = location.state || {from: {pathname: "/"}};
        return <Navigate to={from}/>;
    }

    if (!onlyUnAuth && !user && isAuthChecked) {
        return <Navigate to="/login" state={{from: location}}/>;
    }
    return component;
};

export const OnlyAuth = ProtectedRoutes;
export const OnlyUnAuth = ({component}: ProtectedRoutesProps) => (
    <ProtectedRoutes onlyUnAuth={true} component={component}/>
);
