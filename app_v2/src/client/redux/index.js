import { combineReducers } from 'redux';

import usersReducer from './reducers/users';
import { moduleName as usersModule } from './actions/users';

export default combineReducers({
    [usersModule] : usersReducer
});
