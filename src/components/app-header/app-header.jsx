import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import React from "react";

const AppHeader = React.memo(() => {
    return (
        <header className="pb-4 pt-4">
            <a href="/" className={styles.logo}>
                <Logo/>
            </a>
            <nav>
                <ul className={`${styles.list} pl-5 pr-5`}>
                    <li className={styles['list-item']}>
                        <a href="/" className={styles.link}>
                            <BurgerIcon type="primary"/>
                            <p className="text text_type_main-default">Конструктор</p>
                        </a>
                    </li>
                    <li className={styles['list-item']}>
                        <a href="/" className={styles.link}>
                            <ListIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                        </a>
                    </li>
                    <li className={styles['list-item']}>
                        <a href="/" className={styles.link}>
                            <ProfileIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
});

export default AppHeader;