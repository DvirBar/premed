import { 
    GET_MESSAGE,
    GET_ERROR 
} from '../actions/types';

const initialState = {
    msg: null,
    status: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_MESSAGE:
        case GET_ERROR:
            return {
                ...state,
                msg: action.payload.msg,
                status: action.payload.status
            }
            
        default:
            return state;
    }
}