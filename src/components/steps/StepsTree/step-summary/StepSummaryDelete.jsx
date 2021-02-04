import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { removeStepSummary } from '../../../../redux/actions/steps'
import { StepsContext } from '../../StepsContext'

function StepSummaryDelete({ stepId, sumId }) {
    const dispatch = useDispatch()
    
    const commitDelete = () => {
        if(isStepsAdmin) {
            dispatch(removeStepSummary(
                stepId,
                sumId
            ))    
        }
    }

    const {
        isStepsAdmin
    } = useContext(StepsContext)

    return (
        <i 
        onClick={() => commitDelete()}
        className="material-icons delete-content">
            close
        </i>
    )
}

export default StepSummaryDelete
