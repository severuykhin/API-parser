import { store } from '../../index'

import { getIsActive } from '../selectors/cities'

import {  
    putContinueParsing,
    putStopParsing,
    putCityUpdate
} from '../actions/cities';

import { PUT_WEBSOCKET_MESSAGE } from '../actions/websocket';

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
    
}

export function* watchWebsocketMessage () {
    yield takeLatest(PUT_WEBSOCKET_MESSAGE, processMessage);
}