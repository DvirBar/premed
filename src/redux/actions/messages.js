import { GET_MESSAGE } from './types';


export const getMessage = (msg, status) => {
    return {
        type: GET_MESSAGE,
        payload: {
            msg: msg,
            status: status
        }
    }
}

