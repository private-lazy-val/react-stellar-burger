import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUser, selectUserIsLoading} from "../../services/user/selector";

const AppHeader = () => {
    const location = useLocation();

    const {user, userIsLoading} = useSelector(state => ({
        user: selectUser(state),
        userIsLoading: selectUserIsLoading(state)
    }));

    const userName = user ? user.name : (userIsLoading ? 'Загрузка...' : 'Личный кабинет');
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
                            <ListIcon type={location.pathname === '/feed'
                            || location.pathname.startsWith('/feed/') ? 'primary' : 'secondary'}/>
                            <span>Лента заказов</span>
                        </NavLink>
                    </li>
                    <li className={styles['list-item']}>
                        <NavLink to='/profile'
                                 className={setActive}>
                            <ProfileIcon type={location.pathname === '/profile'
                            || location.pathname.startsWith('/profile/') ? 'primary' : 'secondary'}/>
                            <span>{userName}</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;