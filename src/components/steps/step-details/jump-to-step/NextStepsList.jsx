import React from 'react'
import JumpToStepItem from './JumpToStepItem'

function NextStepsList({ nextSteps }) {
    return (
        <div className="next-steps-list">
            {nextSteps.map(step => 
                <JumpToStepItem 
                step={step} />
            )}
        </div>
    )
}

export default NextStepsList
