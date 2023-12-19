import {useLocation} from "react-router-dom";
import React from "react";

const ItemNotFound = (): React.JSX.Element => {
    const location = useLocation();
    const {pathname} = location;

    let message;

    if (pathname.includes('/ingredients')) {
        message = "Ingredient with this ID doesn't exist";
    } else if (pathname.includes('/feed') || pathname.includes('/profile')) {
        message = "Order not found";
    }

    return (
        <h1 className="text_type_digits-medium">{message}</h1>
    );
};

export default ItemNotFound;