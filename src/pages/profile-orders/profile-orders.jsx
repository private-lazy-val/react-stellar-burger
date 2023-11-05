import styles from "../auth.module.css";
import {NavLink} from "react-router-dom";
import {useUserActions} from "../../hooks/use-user-actions";
import {useDispatch, useSelector} from "react-redux";
import {
    connect as connectProfileOrders,
    disconnect as disconnectProfileOrders
} from "../../services/profile-orders/actions";
import {useEffect, useState} from "react";
import {WS_URL} from "../../api/ws-api";
import {getCookie} from "../../utils/cookies";
import {reconnectToWs} from "../../utils/ws-reconnect";

const ProfileOrders = () => {
    const dispatch = useDispatch();
    const {onLogout, setActive} = useUserActions();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Attempt to get the access token from the cookie
        const token = getCookie('accessToken');
        if (token) {
            setAccessToken(token);
        }
    }, []);

    useEffect(() => {
        // If accessToken state gets updated and is not null, connect to WebSocket
        if (accessToken) {
            dispatch(connectProfileOrders(`${WS_URL}/orders?token=${accessToken}`));
            return () => {
                // Disconnect WebSocket when the component unmounts or accessToken changes
                dispatch(disconnectProfileOrders());
            };
        }
    }, [accessToken, dispatch]);

    const {orders, connectingError} = useSelector(
        (state) => state.profileOrders);

    useEffect(() => {
        // Listen for JWT expired error to reconnect
        if (connectingError === 'Invalid or missing token') {
            reconnectToWs(setAccessToken);
        }
    }, [connectingError]);

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
                    <div>
                        <ul>
                            {orders.map((order) => (
                                <li>{order.name}</li>
                            ))}
                        </ul>
                    </div>
                </ul>
            </div>
        </main>
    );
};

export default ProfileOrders;