import React from 'react'
import { useSelector } from 'react-redux'
import { getNextSteps } from '../../../../redux/selectors/steps';
import NextStepsList from './NextStepsList';
import ParentNextStepsList from './ParentNextStepsList'

function NextStepsBlock({ step }) {
    const nextSteps = useSelector(getNextSteps(step._id))
    const parentId = step.parent

    return (
        <div>
            {nextSteps.length > 0
            ?   <NextStepsList
                nextSteps={nextSteps} />

            :   parentId &&
                <ParentNextStepsList
                parentId={parentId} />
            }
        </div>
    )
}

export default NextStepsBlock
