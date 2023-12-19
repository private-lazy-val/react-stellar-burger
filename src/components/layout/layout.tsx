import AppHeader from "../app-header/app-header";
import {Outlet} from "react-router-dom";
import React from "react";

const Layout = (): React.JSX.Element => {
    return (
        <>
            <AppHeader/>
            <Outlet/>
        </>
    );
};
export default Layout;