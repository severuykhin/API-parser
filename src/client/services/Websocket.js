import { putWebsocketMessage } from '../redux/actions/websocket';
import { putPauseParsing } from '../redux/actions/cities';
import config from '../../common/config';

class Websocket {

    constructor() {
        this.websocket = null;
    }

    createWebSocket(store) {
        this.websocket = new WebSocket(`ws://localhost:${config.websocketPort}`);

        const self = this;

        this.websocket.onopen = function () {
            console.log("Websocket connection ready");
        }

        this.websocket.onclose = function (event) {

            store.dispatch(putPauseParsing());

            console.log('Websocket connection closed' + (event.wasClean ? ' clean' : ''));
            console.log('Websocket closed with code: ' + event.code + ', reason: ' + event.reason);

            setTimeout(function () {
                self.createWebSocket(store);
            }, 3000);
        }

        this.websocket.onmessage = function (event) {
            let message;

            try {
                message = JSON.parse(event.data);
            } catch (e) {
                /**
                 * @todo - error handler
                 */
                throw e;
            }

            store.dispatch(putWebsocketMessage(message));

        };
    }

}

export default new Websocket();