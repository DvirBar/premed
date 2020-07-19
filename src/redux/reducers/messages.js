import { 
    INIT_MESSAGE,
    GET_MESSAGE,
    GET_ERROR 
} from '../actions/types';

const initialState = {
    msg: null,
    status: null
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case INIT_MESSAGE:
            return initialState;

        case GET_MESSAGE:
            return {
                ...state,
                msg: payload.msg,
                status: payload.status
            }

        case GET_ERROR:
            if(payload.msg) {
                return {
                    ...state,
                    msg: payload.msg,
                    status: payload.status
                }
            }
            else {
                return {
                    ...state,
                    msg: "נראה שמשהו השתבש. לא יכולנו להשלים את הפעולה.",
                    status: payload.status
                }
            }
            
        default:
            return state;
    }
}