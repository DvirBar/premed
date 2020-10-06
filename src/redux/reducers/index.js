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
import datafields, * as fieldSelectors from './datafields';
import unis from './universities';
import calcs from './calculations';
import userdata, * as dataSelectors from './userdata';
import datatables from './datatables';
import questgroups from './questgroups';

const appReducer = combineReducers({
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
    datafields,
    unis,
    calcs,
    userdata,
    datatables,
    questgroups
});

const rootReducer = (state, action) => {
    if(action.type === 'LOGOUT_SUCCESS') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;

export const getGroupFields = fields => 
    fieldSelectors.getGroupFields(fields)


export const getFilteredSortedData = state => {
    let stateCollection = state.tableData
    let ordering = state.ordering

    if(state.ordering.filters) {
        stateCollection = dataSelectors.filterData(stateCollection, ordering);
    }

    if(state.ordering.sort.type) {
        stateCollection = dataSelectors.sortData(stateCollection, ordering);
    }
    
    return stateCollection;
}