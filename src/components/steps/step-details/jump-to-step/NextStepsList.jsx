import React, { Fragment, useContext } from 'react'
import { StepsContext } from '../../StepsContext'
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
