import { store } from '../../index';

import {  
    putContinueParsing,
    putStopParsing
} from '../actions/cities';

import { PUT_WEBSOCKET_MESSAGE } from '../actions/websocket';

import { 
    takeLatest, 
    put 
} from 'redux-saga/effects'

   
function* processMessage(action) {

    const message = action.payload;

    if (message.type === 'city-process') {
        /**
         * @todo - обновление прогресса
         */
    }

    if (message.type === 'city-end') {
        store.dispatch(putContinueParsing());
    }
    
}

export function* watchWebsocketMessage () {
    yield takeLatest(PUT_WEBSOCKET_MESSAGE, processMessage);
}