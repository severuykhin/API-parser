export const moduleName = 'WEBSOCKET';
export const PUT_WEBSOCKET_MESSAGE = `${moduleName}:PUT_WEBSOCKET_MESSAGE`;

export const putWebsocketMessage = (message) => {
    return {
        type: PUT_WEBSOCKET_MESSAGE,
        payload: message
    }
}