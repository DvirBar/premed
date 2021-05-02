import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getStepChildren } from '../../../../redux/selectors/steps'
import ChildrenNextSteps from './ChildrenNextSteps'
import NextStepsBlock from './NextStepsBlock'


function JumpToStep({ step }) {
    const children = useSelector(getStepChildren(step._id))
    return (
        <div className="jump-to-step">
            <span className="jump-to-step-title">
                השלבים הבאים:
            </span>
            {children.length > 0
            ?   <ChildrenNextSteps nextSteps={children} />
            :   <NextStepsBlock step={step}/>
            }
        </div>
    )
}

export default JumpToStep
