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

export const getMessage = msg => {
    return {
        type: GET_MESSAGE,
        payload: {
            msg: msg,
            status: msg.status
        }
    }
}


export const getError = error => dispatch => { 
    if(error?.response) {
        dispatch({
            type: GET_ERROR,
            payload: {
                msg: error.response.data.he,
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
