import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const location = useLocation();
    const { isAuth, isLoading } = useAuth();  // Using useAuth here to get authentication status and loading status

    if (isLoading) {
        return null;  // You might want to show a spinner or a loading screen instead of null
    }

    return (
        isAuth
            ? <Outlet/>
            : <Navigate to="/login" state={{from: location}} replace/>
    );
}

export default RequireAuth;
