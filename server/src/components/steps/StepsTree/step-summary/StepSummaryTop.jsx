import React, { useContext } from 'react'
import { StepsContext } from '../../StepsContext'
import AddStepSummary from './AddStepSummary'
import StepSummaryDelete from './StepSummaryDelete'

function StepSummaryTop({ 
    display, 
    toggleDisplay,
    toggleGroups,
    displayGroups,
    stepId,
    summary,
    color
    }) {

    const {
        isStepsAdmin
    } = useContext(StepsContext)

    return (
        <div 
        onMouseDown={() => toggleGroups(!displayGroups)}
        className={`step-summary-top
        ${!isStepsAdmin ? 'client' : ''}`}>
            {display 
            ?   <AddStepSummary
                stepId={stepId}
                summary={summary}
                toggleDisplay={toggleDisplay}
                isEdit={true} />

            :  <span
               className="step-summary-name">
                    {summary.name}
                </span>
            }

            {isStepsAdmin &&
                <StepSummaryDelete
                stepId={stepId}
                sumId={summary._id} />
            }

    </div>
    )
}

export default StepSummaryTop
