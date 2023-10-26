import AppHeader from "../app-header/app-header";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <AppHeader/>
            <Outlet/>
        </>
    );
};

export default Layout;