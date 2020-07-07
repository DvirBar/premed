import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import ancs from './anouncements';

export default combineReducers({
    auth,
    messages,
    ancs
});