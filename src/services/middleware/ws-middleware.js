// middleware creator
export const wsMiddleware = (wsActions) => {
    return (store) => {
        let socket = null; // middleware

        return (next) => (action) => {
            const {dispatch} = store;
            const {type} = action;
            const {
                wsConnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            if (type === wsConnect.type) {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = (event) => {
                    dispatch(onError('Failed to connect to websocket'));
                };

                socket.onmessage = (event) => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);

                    if (parsedData.success) {
                        dispatch(onMessage(parsedData));
                    } else {
                        dispatch(onError('Failed to connect to websocket\''));
                    }
                };

                socket.onclose = (event) => {
                    dispatch(onClose());
                };

                if (wsSendMessage && type === wsSendMessage.type) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (wsDisconnect.type === type) {
                    socket.close();
                    socket = null;
                }
            }
            next(action);
        };
    };
};
