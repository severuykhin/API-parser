import { combineReducers } from 'redux';

import usersReducer from './reducers/users';
import citiesReducer from './reducers/cities';
import websocketReducer from './reducers/websocket';

import { moduleName as usersModule } from './actions/users';
import { moduleName as citiesModule } from './actions/cities';
import { moduleName as websocketModule } from './actions/websocket';

export default combineReducers({
    [usersModule]: usersReducer,
    [citiesModule]: citiesReducer,
    [websocketModule]: websocketReducer
});
