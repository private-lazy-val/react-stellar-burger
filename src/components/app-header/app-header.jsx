import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import React from "react";
import {Link, useLocation} from "react-router-dom";

const AppHeader = React.memo(() => {
    const location = useLocation();

    return (
        <header className="pb-4 pt-4">
            <Link to="/" className={styles.logo}>
                <Logo/>
            </Link>
            <nav>
                <ul className={`${styles.list} pl-5 pr-5`}>
                    <li className={styles['list-item']}>
                        <Link to='/'
                              className={`text text_type_main-default ${location.pathname === '/' ? '' : 'text_color_inactive'}`}>
                            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/>
                            <span>Конструктор</span>
                        </Link>
                    </li>
                    <li className={styles['list-item']}>
                        <Link to='/feed'
                              className={`text text_type_main-default ${location.pathname.startsWith('/feed') ? '' : 'text_color_inactive'}`}>
                            <ListIcon type={location.pathname.startsWith('/feed') ? 'primary' : 'secondary'}/>
                            <span>Лента заказов</span>
                        </Link>
                    </li>
                    <li className={styles['list-item']}>
                        <Link to='/profile'
                              className={`text text_type_main-default ${location.pathname.startsWith('/profile') ? '' : 'text_color_inactive'}`}>
                            <ProfileIcon type={location.pathname.startsWith('/profile') ? 'primary' : 'secondary'}/>
                            <span>Личный кабинет</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
});

export default AppHeader;