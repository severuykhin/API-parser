import { store } from '../../index'
import { getIsActive } from '../selectors/cities'
import {  
    putContinueParsing,
    putStopParsing,
    putCityUpdate
} from '../actions/cities';
import { putError } from '../actions/errors'
import { PUT_WEBSOCKET_MESSAGE } from '../actions/websocket';
import * as ERROR_CONSTANTS from '../../../common/errors/CONSTATNS'; 


import { 
    takeLatest, 
    put 
} from 'redux-saga/effects'

   
function* processMessage(action) {

    const message = action.payload;
    const parsingIsActive = getIsActive(store);

    if (message.type === 'city-process') {
        yield put(putCityUpdate({id: message.data.city.id, count: message.data.count }));
    }

    if (message.type === 'city-end' && parsingIsActive) {
        yield put(putContinueParsing());
    }

    if (message.type === ERROR_CONSTANTS.ERROR_ACCESS) {
        yield put(putError(message));
    }

    if (message.type === ERROR_CONSTANTS.ERROR_KEYS_EXPIRED) {
        yield(put(putStopParsing()));
        yield put(putError(message));
    } 
    
}

export function* watchWebsocketMessage () {
    yield takeLatest(PUT_WEBSOCKET_MESSAGE, processMessage);
}