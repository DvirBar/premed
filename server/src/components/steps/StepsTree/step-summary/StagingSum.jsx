import React from 'react'
import AddStepSummary from './AddStepSummary'

function StagingSum({ stepId, toggleDisplay }) {
    return (
        <div className="step-summary-staging">
            <AddStepSummary
            stepId={stepId}
            toggleDisplay={toggleDisplay} />
            
            <button 
            onClick={() => toggleDisplay(false)}
            className="cancel-summary-add">
                ביטול
            </button>
        </div>
    )
}

export default StagingSum
