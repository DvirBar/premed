import {
    LIBRARY_LOADING,
    LIBRARY_SUCCESS,
    LIBRARY_ERROR,
    LIBRARY_ADD,
    LIBRARY_UPDATE,
    LIBRARY_DELETE,
    LIB_ITEM_ADD,
    LIB_ITEM_EDIT,
    LIB_ITEM_DELETE,
    LIB_ITEM_TOGGLE_VOTE
} from './types';

const initialState = {
    loading: false,
    libraries: []
}

export default function(state = initialState, action) {
    const payload = action.payload;
    
    switch(action.type) {
        case LIBRARY_LOADING:
            return {
                ...state,
                loading: true
            }

        case LIBRARY_SUCCESS:
            return {
                ...state,
                loading: false,
                libraries: payload
            }

        case LIBRARY_ERROR:
            return {
                ...state,
                loading: false,
            }

        case LIBRARY_ADD:
            return {
                ...state,
                loading: false,
                libraries: [...state.libraries, payload]
            }

        case LIBRARY_UPDATE:
            return {
                ...state,
                loading: false,
                libraries: state.libraries.map(library => 
                    library._id === payload._id ? payload : library)
            }

        case LIB_ITEM_ADD:
            return {
                ...state,
                loading: false,
                libraries: state.libraries.map(library => 
                    library._id === payload.libId 
                    ?   {
                        ...library,
                        items: [...library.items, payload.item]
                    }
                    : library)
            }

        case LIB_ITEM_EDIT:
            return {
                ...state,
                loading: false,
                libraries: state.libraries.map(library => 
                    library._id === payload.libId 
                    ?   {
                        ...library,
                        items: library.items.map(item => 
                            item._id === payload.itemId ? payload.item : item)
                    }
                    : library)
            }


        case LIB_ITEM_TOGGLE_VOTE:
            console.log(payload);
            return {
                ...state,
                loading: false,
                libraries: state.libraries.map(library => 
                    library._id === payload.id 
                    ?   {
                        ...library,
                        items: library.items.map(item => 
                            item._id === payload.itemId 
                            ? {
                                ...item,
                                upvotes: payload.votes.upvotes,
                                downvotes: payload.votes.downvotes
                            }
                            : item)
                    }
                    : library)
            }

        case LIB_ITEM_DELETE:
            return {
                ...state,
                loading: false,
                libraries: state.libraries.map(library => 
                    library._id === payload.libId 
                    ?   {
                        ...library,
                        items: library.items.filter(item => 
                            item._id !== payload)
                    }
                    : library)
            }

        case LIBRARY_DELETE:
            return {
                ...state,
                loading: false,
                libraries: state.libraries.filter(library => 
                    library._id !== payload)
            }
        
        default:
            return state;
    }
}