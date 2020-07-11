import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import ancs from './anouncements';
import sections from './sections';

export default combineReducers({
    auth,
    messages,
    ancs,
    sections
});