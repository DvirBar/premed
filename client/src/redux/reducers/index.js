import { combineReducers } from 'redux';
import auth from './auth';
import messages from './messages';
import sections from './sections';
import paths from './paths';
import steps from './steps';
import datagroups from './datagroups';
import datafields, * as fieldSelectors from './datafields';
import unis from './universities';
import calcs from './calculations';
import userdata from './userdata';
import datatables from './datatables';
import questions from '../questions/reducers';
import inquiries from './inquiries';
import statsinputs from './statsinputs';
import libraries from '../libraries/reducers';
import comments from '../comments/reducers';
import ancs from '../announcements/ancs/reducers';
import ancgroups from '../announcements/groups/reducers';
import loader from '../loader/reducers';

const appReducer = combineReducers({
    auth,
    messages,
    paths,
    ancgroups,
    ancs,
    sections,
    steps,
    datagroups,
    datafields,
    unis,
    calcs,
    userdata,
    datatables,
    questions,
    inquiries,
    statsinputs,
    libraries,
    comments,
    loader
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer;

export const getGroupFields = fields => 
    fieldSelectors.getGroupFields(fields)
