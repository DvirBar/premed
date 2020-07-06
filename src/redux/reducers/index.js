import { combineReducers } from 'redux';
import auth from './auth';
import ancs from './anouncements';

export default combineReducers({
    auth,
    ancs
});