import { all } from 'redux-saga/effects';
import {watchParsing} from './watchParsing';
import {watchWebsocketMessage} from './watchWebscoket';

export default function* init() {
    yield all([
        watchParsing(),
        watchWebsocketMessage()
    ]);
}