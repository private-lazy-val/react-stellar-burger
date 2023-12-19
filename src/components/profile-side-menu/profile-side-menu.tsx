import {NavLink} from "react-router-dom";
import {useUserActions} from "../../hooks/use-user-actions";
import styles from './profile-side-menu.module.css';
import React from "react";

const ProfileSideMenu = (): React.JSX.Element => {
    const {onLogout, setActive} = useUserActions();

    return (
        <ul className={styles[`side-menu`]} aria-label='Навигация'>
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
    );
};

export default ProfileSideMenu;