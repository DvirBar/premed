import {
    TOPIC_LOADING,
    TOPIC_SUCCESS,
    TOPIC_ERROR,
    TOPIC_ADD,
    TOPIC_UPDATE,
    TOPIC_DELETE,
    TOPIC_ITEM_ADD,
    TOPIC_ITEM_UPDATE,
    TOPIC_ITEM_TOGGLE_UPVOTE,
    TOPIC_ITEM_TOGGLE_DOWNVOTE,
    TOPIC_ITEM_COMMENT_ADD,
    TOPIC_ITEM_COMMENT_UPDATE,
    TOPIC_ITEM_COMMENT_DELETE,
    TOPIC_ITEM_DELETE,
    TOPIC_ITEM_COMMENT_TOGGLE_LIKE
} from '../actions/types';

const initialState = {
    loading: false,
    topics:[]
}

export default function(state = initialState, action) {
    const payload = action.payload

    switch(action.type) {
        case TOPIC_LOADING:
            return {
                ...state,
                loading: true
            }

        case TOPIC_SUCCESS:
            return {
                ...state,
                loading: false,
                topics: payload
            }

        case TOPIC_ERROR: 
            return {
                ...state,
                loading: false,
                topics: []
            }

        case TOPIC_ADD:
            return {
                ...state,
                loading: false,
                topics: [...state.topics, payload]
            }

        case TOPIC_UPDATE:
        case TOPIC_ITEM_ADD:
        case TOPIC_ITEM_UPDATE:
        case TOPIC_ITEM_DELETE:
            return {
                ...state,
                loading: false,
                topics: state.topics.map(topic => 
                    topic._id === payload._id ? topic = payload : topic)
            }

        case TOPIC_ITEM_TOGGLE_UPVOTE:
        case TOPIC_ITEM_TOGGLE_DOWNVOTE:
            return {
                ...state,
                loading: false,
                topics: state.topics.map(topic => 
                    topic._id === payload.topicId
                    ?   {
                        ...topic,   
                        items: topic.items.map(item => 
                        item._id === payload.itemId
                        ?   {
                                ...item,
                                upvotes: payload.data.upvotes,
                                downvotes: payload.data.downvotes
                            }
                        :   item)
                    }
                    :   topic)
            }
            
        case TOPIC_ITEM_COMMENT_ADD:
            return {
                ...state,
                loading: false,
                topics: state.topics.map(topic =>
                    topic._id === payload.topicId
                    ?   {
                        ...topic,
                        items: topic.items.map(item =>
                            item._id === payload.itemId
                            ?   {
                                ...item,
                                comments: payload.comments
                            }
                            :   item)
                        }
                    :   topic)
            }

        case TOPIC_ITEM_COMMENT_UPDATE:
            return {
                ...state,
                loading: false,
                topics: state.topics.map(topic =>
                    topic._id === payload.topicId
                    ?   {
                        ...topic,
                        items: topic.items.map(item =>
                            item._id === payload.itemId
                            ?   {
                                ...item,
                                comments: item.comments.map(comment =>
                                    comment._id === payload.commentId
                                    ?   payload.comment
                                    :   comment)
                            }
                            :   item)
                    }
                        
                    :   topic)
            }


        case TOPIC_ITEM_COMMENT_TOGGLE_LIKE:
            return {
                ...state,
                loading: false,
                topics: state.topics.map(topic =>
                    topic._id === payload.topicId
                    ?   {   
                            ...topic,
                            items: topic.items.map(item =>
                            item._id === payload.itemId
                            ?   {
                                ...item,
                                comments: item.comments.map(comment =>
                                    comment._id === payload.commentId
                                    ?   {
                                        ...comment,
                                        likes: payload.likes
                                    }
                                    :   comment)
                                }
                            :   item)
                        }
                    :   topic)
            }

        case TOPIC_ITEM_COMMENT_DELETE:
            return {
                ...state,
                loading: false,
                topics: state.topics.map(topic =>
                    topic._id === payload.topicId
                    ?   {   
                            ...topic,
                            items: topic.items.map(item =>
                            item._id === payload.itemId
                            ?  {
                                ...item,
                                comments: item.comments.filter(comment =>
                                    comment._id !== payload.commentId)
                            } 
                            :   item)
                        }
                    :   topic)
            }



        case TOPIC_DELETE: 
            return {
                ...state,
                loading: false,
                topics: state.topics.filter(topic => topic._id !== payload)
            }

        default: 
            return state;
    }
}