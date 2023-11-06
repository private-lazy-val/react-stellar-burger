import styles from "../auth.module.css";
import {useDispatch, useSelector} from "react-redux";
import {
    connect as connectProfileOrders,
    disconnect as disconnectProfileOrders
} from "../../services/profile-orders/actions";
import {useEffect, useMemo, useState} from "react";
import {WS_URL} from "../../api/ws-api";
import {getCookie} from "../../utils/cookies";
import ProfileSideMenu from "../../components/profile-side-menu/profile-side-menu";
import Orders from "../../components/orders/orders";
import {validateOrdersPayload} from "../../utils/validate-orders-payload";

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

    const {orders} = useSelector(
        (state) => state.profileOrders);

    const validOrders = useMemo(() => validateOrdersPayload(orders), [orders]);

    return (
            <main className={styles.profile}>
                <ProfileSideMenu/>
                {validOrders && <Orders orders={orders}/>}
            </main>
    );
};

export default ProfileOrders;