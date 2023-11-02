import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import React from "react";
import {NavLink, useLocation} from "react-router-dom";

const AppHeader = React.memo(() => {
    const location = useLocation();
    const setActive = ({isActive}) => isActive
        ? 'text text_type_main-default'
        : 'text text_type_main-default text_color_inactive';

    return (
        <header className={`${styles.header} pb-4 pt-4`}>
            <NavLink to="/" className={styles.logo}>
                <Logo/>
            </NavLink>
            <nav>
                <ul className={`${styles.list} pl-5 pr-5`}>
                    <li className={styles['list-item']}>
                        <NavLink to='/'
                                 className={setActive}>
                            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/>
                            <span>Конструктор</span>
                        </NavLink>
                    </li>
                    <li className={styles['list-item']}>
                        <NavLink to='/feed'
                                 className={setActive}>
                            <ListIcon type={location.pathname.startsWith('/feed') ? 'primary' : 'secondary'}/>
                            <span>Лента заказов</span>
                        </NavLink>
                    </li>
                    <li className={styles['list-item']}>
                        <NavLink to='/profile'
                                 className={setActive}>
                            <ProfileIcon type={location.pathname.startsWith('/profile') ? 'primary' : 'secondary'}/>
                            <span>Личный кабинет</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
});

export default AppHeader;