import styles from "../auth.module.css";
import {useDispatch, useSelector} from "react-redux";
import {
    connect as connectProfileOrders,
    disconnect as disconnectProfileOrders
} from "../../services/profile-orders/actions";
import {useEffect, useState} from "react";
import {WS_URL} from "../../api/ws-api";
import {getCookie} from "../../utils/cookies";
import {reconnectToWs} from "../../utils/ws-reconnect";
import ProfileSideMenu from "../../components/profile-side-menu/profile-side-menu";
import Orders from "../../components/orders/orders";

const ProfileOrders = () => {
    const dispatch = useDispatch();

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
            <ProfileSideMenu/>
            <Orders orders={orders}/>
        </main>
    );
};

export default ProfileOrders;