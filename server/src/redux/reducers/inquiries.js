import {
    INQUIRY_LOADING,
    INQUIRY_SUCCESS,
    INQUIRY_ERROR,
    GET_INQUIRY_TYPES,
    INQUIRY_ADD,
    INQUIRY_UPDATE,
    INQUIRY_ASSIGN_ADMIN,
    INQUIRY_CHANGE_STATUS,
    INQUIRY_UPDATE_STATUS_NOTE,
    INQUIRY_DELETE,
} from '../actions/types';

const initialState = {
    loading: false,
    inquiries: [],
    types: {}
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case INQUIRY_LOADING:
            return {
                ...state,
                loading: true
            }
            
        case INQUIRY_SUCCESS: 
            return {
                ...state,
                loading: false,
                inquiries: payload
            }
            
        case INQUIRY_ERROR:
            return {
                ...state,
                loading: false,
            }
    
        case GET_INQUIRY_TYPES:
            return {
                ...state,
                loading: false,
                types: payload
            }

        case INQUIRY_ADD:
            return {
                ...state,
                loading: false,
                inquiries: [...state.inquiries, payload]
            }

        case INQUIRY_UPDATE: 
            return {
                ...state,
                loading: false,
                inquiries: state.inquiries.map(inquiry => 
                    inquiry._id === payload._id ? inquiry = payload : inquiry)
            }

        case INQUIRY_ASSIGN_ADMIN: 
            return {
                ...state,
                loading: false,
                inquiries: state.inquiries.map(inquiry => 
                    inquiry._id === payload.inquiryId
                    ? {
                        ...inquiry,
                        assignedAdmin: payload.admin
                    }
                    
                    : inquiry
                )
            }

        case INQUIRY_CHANGE_STATUS:
            return {
                ...state,
                loading: false,
                inquiries: state.inquiries.map(inquiry => 
                    inquiry._id === payload.inquiryId
                    ? {
                        ...inquiry,
                        statuses: payload.statuses
                    }
                    
                    : inquiry
                )
            }

        case INQUIRY_UPDATE_STATUS_NOTE:  
            return {
                ...state,
                loading: false,
                inquiries: state.inquiries.map(inquiry => 
                    inquiry._id === payload.inquiryId
                    ? {
                        ...inquiry,
                        statuses: inquiry.statuses.map(status => 
                            status._id === payload.statusId
                            ? payload.status : status
                        )
                    }
                    
                    : inquiry
                )
            }


        case INQUIRY_DELETE:
            return {
                ...state,
                inquiries: state.inquiries.filter(inquiry => 
                    inquiry._id !== payload)
            }

        default:
            return state;
    }
}

