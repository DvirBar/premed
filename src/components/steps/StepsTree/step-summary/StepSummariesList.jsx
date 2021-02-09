import React from 'react'
import { useSelector } from 'react-redux'
import { getStepsSummaries } from '../../../../redux/selectors/steps'
import StepSummaryItem from './StepSummaryItem'

function StepSummariesList({ stepId, summaries, color }) {
    return (
        <div className="step-summaries-list">
            {summaries.map(sum =>
                <StepSummaryItem
                summary={sum}
                stepId={stepId}
                color={color} />
            )}
        </div>
    )
}

export default StepSummariesList
