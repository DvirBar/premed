import messages from '../reducers/messages';
import { 
    INIT_MESSAGE,
    GET_MESSAGE,
    GET_ERROR
} from './types';


export const initMessage = () => {
    return {
        type: INIT_MESSAGE
    }
}

export const getMessage = msgObj => dispatch => {
    if(msgObj.msg.he) {
        dispatch({
            type: GET_MESSAGE,
            payload: {
                msg: msgObj.msg.he,
                status: msgObj.status
            }
        })

        setTimeout(() => dispatch(initMessage()), 7000)
    }
    
    else {
        dispatch(initMessage())
    }
}


export const getError = error => dispatch => { 
    if(error?.response) {
        dispatch({
            type: GET_ERROR,
            payload: {
                msg: error.response.data.he || "התרחשה תקלה לא צפויה. ניתן לרענן את הדף או לנסות מאוחר יותר.",
                status: error.response.status
            }
        })
    }

    else {
        dispatch({
            type: GET_ERROR
        })
    }

    setTimeout(() => dispatch(initMessage()), 7000)
}
