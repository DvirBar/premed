import React from 'react'
import StepSummaryItem from './StepSummaryItem'

function StepSummariesList({ stepId, summaries }) {
    return (
        <div className="step-summaries-list">
            {summaries.map(sum =>
                <StepSummaryItem
                summary={sum}
                stepId={stepId} />
            )}
        </div>
    )
}

export default StepSummariesList
