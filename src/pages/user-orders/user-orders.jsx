import styles from "../auth.module.css";
import {NavLink} from "react-router-dom";
import {useUserActions} from "../../hooks/use-user-actions";

const UserOrders = () => {
    const {onLogout, setActive} = useUserActions();

    return (
        <main className={styles.profile}>
            <div aria-label='side-menu'>
                <ul className={styles.sidebar}>
                    <li><NavLink end to='/profile' className={setActive}>Профиль</NavLink></li>
                    <li><NavLink to='/profile/orders' className={setActive}>История заказов</NavLink></li>
                    <li>
                        <button
                            className={`${styles['logout-btn']} text text_type_main-medium text_color_inactive`}
                            type='button'
                            onClick={onLogout}>
                            Выход
                        </button>
                    </li>
                </ul>
            </div>
        </main>
    );
};

export default UserOrders;