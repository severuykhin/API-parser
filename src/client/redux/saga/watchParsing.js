import { PUT_START_PARSING, PUT_STOP_PARSING, PUT_CONTINUE_PARSING} from '../actions/cities';
import { getSelectedStack, getIsActive } from '../selectors/cities';
import { putSelectedStack, putStopParsing, putActiveCity } from '../actions/cities';
import { getQuery, getFilename } from '../selectors/cities';
import   Websocket from '../../services/Websocket';
import { store } from '../../index';
import { takeLatest, put } from 'redux-saga/effects'

   
function* parseNextCityFromStack() {
    let stack    = getSelectedStack(store);
    let isActive = getIsActive(store);
    let query    = getQuery(store);
    let fileName = getFilename(store);

    let activeCity = stack.shift();
   
    if (!activeCity) {
        yield put(putStopParsing());
        return false;
    }

    yield put(putSelectedStack(stack));
    yield put(putActiveCity(activeCity))

    let message = JSON.stringify({
        city: activeCity,
        fileName: fileName,
        request: query
    });

    Websocket.websocket.send(message);
}

export function* watchParsing () {
    yield takeLatest(PUT_START_PARSING, parseNextCityFromStack);
    yield takeLatest(PUT_CONTINUE_PARSING, parseNextCityFromStack);
}