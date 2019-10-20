import { combineReducers } from 'redux';

import usersReducer from './reducers/users';
import citiesReducer from './reducers/cities';
import websocketReducer from './reducers/websocket';
import errorsReducer from './reducers/errors';

import { moduleName as usersModule } from './actions/users';
import { moduleName as citiesModule } from './actions/cities';
import { moduleName as websocketModule } from './actions/websocket';
import { moduleName as errorsModule } from './actions/errors';

export default combineReducers({
    [usersModule]     : usersReducer,
    [citiesModule]    : citiesReducer,
    [websocketModule] : websocketReducer,
    [errorsModule]    : errorsReducer
});
