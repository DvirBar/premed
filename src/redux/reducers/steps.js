import {
    STEP_LOADING,
    STEP_SUCCESS,
    STEP_ERROR,
    STEP_ADD,
    STEP_UPDATE,
    STEP_DELETE
} from '../actions/types';

const initialState = {
    loading: false,
    steps: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case STEP_LOADING:
            return {
                ...state,
                loading: true
            }

        case STEP_SUCCESS: 
            return {
                ...state,
                loading: false,
                steps: payload
            }

        case STEP_ERROR:
            return {
                ...state,
                loading: false,
            }

        case STEP_ADD:
            return {
                ...state,
                loading: false,
                steps: [...state.steps, payload]
            }

        case STEP_UPDATE:
            return {
                ...state,
                loading: false,
                steps: state.steps.map(step => step._id === payload._id ? step = payload : step)
            }

        case STEP_DELETE:
            return {
                ...state,
                loading: false,
                steps: state.steps.filter(step => step._id !== payload)
            }

        default:
            return state;
    }
}


// export const selectPathSteps = (state, path) => {
//     state.steps.filter(step => {
//         step.path === path._id
//     })
// }