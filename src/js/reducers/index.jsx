import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { message } from './message.reducer';

const rootReducer = combineReducers({
    user,
    message
});

export default rootReducer;