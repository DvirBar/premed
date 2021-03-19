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
            msg: msg.he,
            status: msg.status
        }
    }
}


export const getError = error => {
    console.log(error);
    if(error?.response) {
        return {
            type: GET_ERROR,
            payload: {
                msg: error.response.data.he,
                status: error.response.status
            }
        }
    }

    else {
        return {
            type: GET_ERROR
        }
    }
}
