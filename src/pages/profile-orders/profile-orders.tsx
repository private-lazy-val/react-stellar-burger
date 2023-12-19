import profileStyles from "../profile/profile.module.css";
import {useDispatch, useSelector} from "../../services/store";
import {
    connect as connectProfileOrders,
    disconnect as disconnectProfileOrders
} from "../../services/profile-orders/actions";
import React, {useEffect, useMemo} from "react";
import {WS_URL} from "../../api/ws-api";
import ProfileSideMenu from "../../components/profile-side-menu/profile-side-menu";
import Orders from "../../components/orders/orders";
import {validateOrdersPayload} from "../../utils/validate-orders-payload";
import {
    selectProfileOrders,
    selectProfileStatus,
    selectProfileIsInitialDataLoaded,
    selectProfileConnectingError
} from "../../services/profile-orders/selector";
import {getSortedOrders} from "../../utils/get-sorted-orders";
import styles from './profile-orders.module.css';
import LoadingComponent from "../../utils/loading-component";
import {selectAccessToken} from "../../services/user/selector";
import {WebsocketStatuses} from "../../enums";

const ProfileOrders = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

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

    const {orders, status, isInitialDataLoaded, connectingError} = useSelector(state => ({
        orders: selectProfileOrders(state),
        status: selectProfileStatus(state),
        isInitialDataLoaded: selectProfileIsInitialDataLoaded(state),
        connectingError: selectProfileConnectingError(state)
    }));

    const validOrders = useMemo(() => {
        if (!validateOrdersPayload(orders)) return [];
        return getSortedOrders(orders);
    }, [orders]);

    let ordersContent;

    if (status === WebsocketStatuses.CONNECTING || (status === WebsocketStatuses.ONLINE && !isInitialDataLoaded)) {
        ordersContent = <div className='page-backdrop'><LoadingComponent/></div>;
    } else if (connectingError && status === WebsocketStatuses.OFFLINE) {
        ordersContent = <h1 className='page-backdrop text_type_digits-medium'>Connection lost. Please try again later.</h1>;
    } else if (status === WebsocketStatuses.ONLINE && validOrders.length === 0 && isInitialDataLoaded) {
        ordersContent = <h1 className={`${styles[`empty-feed`]} text_type_digits-medium`}>You haven't placed any orders yet</h1>
    } else if (status === WebsocketStatuses.ONLINE && validOrders.length > 0) {
        ordersContent = <Orders orders={validOrders} />
    }

    return (
            <main className={profileStyles.profile}>
                <ProfileSideMenu/>
                {ordersContent}
            </main>
    );
};

export default ProfileOrders;