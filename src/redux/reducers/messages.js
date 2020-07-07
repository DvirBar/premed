import { GET_MESSAGE } from '../actions/types';

const initialState = {
    msg: null,
    status: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MESSAGE:
            return {
                ...state,
                msg: action.payload.msg,
                status: action.payload.status
            }
        default:
            return state;
    }
}