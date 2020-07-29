import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import ancs from './anouncements';
import sections from './sections';
import paths from './paths';
import ancgroups from './ancgroups';
import steps from './steps';

export default combineReducers({
    auth,
    messages,
    paths,
    ancgroups,
    ancs,
    sections,
    steps
});