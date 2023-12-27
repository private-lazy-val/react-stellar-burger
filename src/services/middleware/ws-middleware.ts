// the middleware allows Redux to interact with a WebSocket by translating WebSocket events into Redux actions
// and vice versa, enabling real-time features in a Redux application.
import {refreshToken} from "../../utils/user-api";
import {setCookie} from "../../utils/cookies";
import {WS_URL} from "../../api/ws-api";
import {setAccessToken} from "../user/user-slice";
import {RootState} from "../store";
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    Middleware,
    MiddlewareAPI
} from '@reduxjs/toolkit';
import {Dispatch} from "redux";

export type TWsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>;
    // wsSendMessage?: ActionCreatorWithPayload<any>;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<any>;
    wsConnecting: ActionCreatorWithoutPayload;
    wsDisconnect: ActionCreatorWithoutPayload;
    wsTokenRefresh?: ActionCreatorWithoutPayload;
}
export const wsMiddleware = (wsActions: TWsActionTypes): Middleware<{}, RootState> => {
    return (store: MiddlewareAPI<Dispatch, RootState>) => { // this function is the actual middleware that will be applied to the Redux store
        let socket: WebSocket | null = null; // the reference to the WebSocket connection
        let isConnected = false; // the socket is closed intentionally
        let reconnectDelay = 1000;
        const maxReconnectAttempts = 5;
        let reconnectAttempts = 0;
        let url = '';

        return (next) => async (action) => { // 'next' is a Redux middleware API function used to pass the action to the next middleware in line
            const {dispatch} = store;
            const {
                wsConnect,
                // wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
                wsTokenRefresh
            } = wsActions;
// If the dispatched action type matches the wsConnect action, a new WebSocket connection
// is established with the URL provided in the action payload.
            // if (type === wsConnect.type)
            if (wsConnect.match(action)) {
                url = action.payload;
                // Close the existing socket if it exists before creating a new one
                if (socket) {
                    socket.close();
                }
                socket = new WebSocket(url);
                isConnected = true;
                dispatch(wsConnecting());
            }
// Defines a handler for the open event on the WebSocket, which dispatches the onOpen action
// when the WebSocket connection is successfully opened.
            if (socket) {
                socket.onopen = () => dispatch(onOpen());

                socket.onerror = () => dispatch(onError('WebSocket error'));

                socket.onmessage = (event) => {
                    const parsedData = JSON.parse(event.data);
                    if (parsedData.message === 'Invalid or missing token') {
                        if (wsTokenRefresh) {
                            dispatch(wsTokenRefresh());
                        }
                    } else if (parsedData.success) {
                        dispatch(onMessage(parsedData));
                    } else {
                        dispatch(onError(parsedData.message || 'Unknown error'));
                    }
                };
                //  if (wsTokenRefresh && type === wsTokenRefresh.type) {
                if (wsTokenRefresh && wsTokenRefresh.match(action)) {
                    console.log('refreshing token...')
                    try {
                        const refreshData = await refreshToken();
                        if (refreshData.success) {
                            console.log('setting tokens...')
                            setCookie("refreshToken", refreshData.refreshToken);
                            dispatch(setAccessToken(refreshData.accessToken.split('Bearer ')[1]));

                            // Reconnect with the new token
                            const newWsUrl = `${WS_URL}/orders?token=${refreshData.accessToken.replace('Bearer ', '')}`;
                            socket.close(); // Close the old socket before opening a new one
                            console.log('opening new connection...')
                            socket = new WebSocket(newWsUrl);
                            dispatch(wsConnecting());
                        }
                    } catch (error) {
                        console.error('Failed to refresh token:', error);
                        dispatch(onError('Token refresh failed'));
                    }
                }

                socket.onclose = () => {
                    dispatch(onClose());
                    // if the socket is not closed intentionally
                    if (isConnected) {
                        if(reconnectAttempts < maxReconnectAttempts) {
                            dispatch(wsConnecting());
                            // attempt to reconnect with an exponential fixed timeout delay
                            setTimeout(() => {
                                console.log('Attempting to reconnect to WebSocket...');
                                dispatch(wsConnect(url));
                                // Increase the delay for the next reconnect attempt
                                reconnectDelay = Math.min(reconnectDelay * 2, 30000);
                                reconnectAttempts++;
                            }, reconnectDelay);
                        } else {
                            dispatch(wsDisconnect());
                        }
                    }
                };

                // if (wsSendMessage && type === wsSendMessage.type) {
                // if (wsActions.wsSendMessage && wsActions.wsSendMessage.match(action)) {
                //     console.log('send')
                //     socket.send(JSON.stringify(action.payload));
                // }

                //   if (wsDisconnect.type === type) {
                if (wsDisconnect.match(action)) {
                    socket.close(); // This calls the close method on the WebSocket object, which initiates the closing handshake to terminate the connection.
                    socket = null;
                    isConnected = false;
                    reconnectAttempts = 0;
                    clearTimeout(reconnectDelay);
                    reconnectDelay = 1000;
                }
            }
            // the middleware passes the action to the next middleware in line,
            // or to the reducers if there are no more middlewares
            next(action);
        };
    };
};
