import { stepMatchUnis } from '../../utils/steps';
import {
    STEP_LOADING,
    STEP_SUCCESS,
    STEP_ERROR,
    STEP_ADD,
    STEP_UPDATE,
    STEP_DELETE,
    STEP_ADD_LINK_LABEL,
    STEP_ADD_SUMMARY,
    STEP_EDIT_SUMMARY,
    STEP_REMOVE_SUMMARY,
    STEP_ADD_SUMMARY_GROUP,
    STEP_ADD_SUMMARY_CONTENT,
    STEP_EDIT_SUMMARY_CONTENT,
    STEP_REMOVE_SUMMARY_CONTENT,
    STEP_ADD_UNI_CONTENT,
    STEP_FILTER_UNIS
} from '../actions/types';

const initialState = {
    loading: false,
    steps: [],
    uniSteps: []
}

export default function(state = initialState, action) {
    const payload = action.payload;

    switch(action.type) {
        case STEP_LOADING:
            return {
                ...state,
                loading: true
            }

        case STEP_SUCCESS: 
            return {
                ...state,
                loading: false,
                steps: payload,
                uniSteps: payload
            }

        case STEP_ERROR:
            return {
                ...state,
                loading: false,
            }

        case STEP_ADD:
            return {
                ...state,
                loading: false,
                uniSteps: [...state.uniSteps, payload]
            }

        case STEP_UPDATE:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => step._id === payload._id ? step = payload : step)
            }

        case STEP_ADD_LINK_LABEL:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        linkLabel: payload.linkInfo
                    }
                    :   step)
            }

        case STEP_ADD_SUMMARY:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        summaries: [
                            ...step.summaries,
                            payload.summary
                        ]
                    }
                    :   step)
            }

        case STEP_EDIT_SUMMARY:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        summaries: step.summaries.map(sum => 
                            sum._id === payload.sumId 
                            ? payload.summary
                            : sum)
                    }
                    :   step)
            }

        case STEP_REMOVE_SUMMARY:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        summaries: step.summaries.filter(sum =>
                            sum._id !== payload.sumId)
                    }
                    :   step)
            }
            

        case STEP_ADD_SUMMARY_GROUP:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        summaries: step.summaries.map(sum => 
                            sum._id === payload.sumId 
                            ? {
                                ...sum,
                                groups: [
                                    ...sum.groups,
                                    payload.group
                                ]
                            }
                            : sum)
                    }
                    :   step)
            }

        case STEP_ADD_SUMMARY_CONTENT:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        summaries: step.summaries.map(sum => 
                            sum._id === payload.sumId 
                            ? {
                                ...sum,
                                groups: sum.groups.map(group => 
                                    group._id === payload.groupId
                                    ?   {
                                        ...group,
                                        contents: [
                                            ...group.contents,
                                            payload.content
                                        ]
                                    }
                                    :   group
                                )
                            }
                            : sum)
                    }
                    :   step)
            }

        case STEP_EDIT_SUMMARY_CONTENT:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        summaries: step.summaries.map(sum => 
                            sum._id === payload.sumId 
                            ? {
                                ...sum,
                                groups: sum.groups.map(group => 
                                    group._id === payload.groupId
                                    ?   {
                                        ...group,
                                        contents: group.contents.map(content => 
                                            content._id === payload.contentId
                                            ?   payload.content
                                            :   content)
                                    }
                                    :   group
                                )
                            }
                            : sum)
                    }
                    :   step)
            }

        case STEP_REMOVE_SUMMARY_CONTENT:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        summaries: step.summaries.map(sum => 
                            sum._id === payload.sumId 
                            ? {
                                ...sum,
                                groups: sum.groups.map(group => 
                                    group._id === payload.groupId
                                    ?   {
                                        ...group,
                                        contents: group.contents.filter(content =>
                                            content._id !== payload.contentId)
                                    }
                                    :   group
                                )
                            }
                            : sum)
                    }
                    :   step)
            }

        case STEP_ADD_UNI_CONTENT:
            return {
                ...state,
                loading: false,
                uniSteps: state.uniSteps.map(step => 
                    step._id === payload.id
                    ?   {
                        ...step,
                        uniData: payload.uniData
                    }
                    :   step)
            }

        case STEP_FILTER_UNIS:
            return {
                ...state,
                uniSteps: state.steps.filter(step =>
                    stepMatchUnis(step, payload))
            }

        case STEP_DELETE:
            // Waits for get steps
            return {
                ...state,
                uniSteps: state.uniSteps.filter(step => step._id !== payload)
            }

        default:
            return state;
    }
}