import {useDispatch, useSelector} from "../../services/store";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {fetchOrder} from "../../services/order-info/order-info-slice";
import {selectOrderStatus, selectOrder, selectOrderError} from "../../services/order-info/selector";
import LoadingComponent from "../../utils/loading-component";
import styles from './order-page.module.css';
import ItemNotFound from "../../utils/item-not-found";
import {useDelayedLoader} from "../../hooks/use-delayed-loader";
import OrderInfo from "../../components/modals/order-info/order-info";
import {AsyncThunkStatuses} from "../../utils/types";

const OrderPage = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const {orderNumber} = useParams<{ orderNumber: string }>();


    const {orderFetchStatus, orderFetchError} = useSelector(state => ({
        orderFetchStatus: selectOrderStatus(state),
        orderFetchError: selectOrderError(state)
    }));

    const isLoading = orderFetchStatus === AsyncThunkStatuses.loading;
    const showLoader = useDelayedLoader({isLoading, delay: 300});

    useEffect(() => {
        dispatch(fetchOrder(orderNumber!))
    }, [orderNumber, dispatch]);

    const order = useSelector(selectOrder);

    let content;

    if (showLoader) {
        content = <div className="page-backdrop"><LoadingComponent/></div>
    } else if (orderFetchStatus === AsyncThunkStatuses.failed && !showLoader) {
        content = <div className="page-backdrop text_type_digits-medium">{orderFetchError}</div>
    } else if (orderFetchStatus === AsyncThunkStatuses.succeeded && order) {
        content = <OrderInfo/>
    }

    if (!order && orderFetchStatus === AsyncThunkStatuses.succeeded) {
        content = <div className='page-backdrop'><ItemNotFound/></div>
    }

    return (
        <div className={styles.container}>
            {content}
        </div>
    );
};

export default OrderPage;