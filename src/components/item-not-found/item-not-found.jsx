import styles from './item-not-found.module.css';
import {useLocation} from "react-router-dom";
const ItemNotFound = () => {
    const location = useLocation();
    const { pathname } = location;

    let message;

    if (pathname.includes('/ingredients')) {
        message = "Ingredient with this ID doesn't exist";
    } else if (pathname.includes('/feed') || pathname.includes('/profile')) {
        message = "Order not found";
    }

    return (
        <h2 className={`${styles[`not-found`]} text text_type_digits-medium mb-2`}>{message}</h2>
    );
};

export default ItemNotFound;