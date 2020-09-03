import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import ancs from './anouncements';
import sections from './sections';
import paths from './paths';
import ancgroups from './ancgroups';
import steps from './steps';
import pages from './pages';
import topics from './topics';
import datagroups from './datagroups';
import datafields from './datafields';

export default combineReducers({
    auth,
    messages,
    paths,
    ancgroups,
    ancs,
    sections,
    steps,
    pages,
    topics,
    datagroups,
});