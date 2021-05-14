import React from 'react'
import { useSelector } from 'react-redux'
import { getStepChildren } from '../../../../redux/selectors/steps'
import useStepsClient from '../../hooks/useStepsClient'
import ChildrenNextSteps from './ChildrenNextSteps'
import NextStepsBlock from './NextStepsBlock'
import StepUnisList from './StepUnisList'

function JumpToStepItem({ step }) {
    const {
        getTreeColor,
        selectStep
    } = useStepsClient()

    const color = getTreeColor(step.uniData)

    const stepStyle = {
        borderColor: color,
        color
    }

    const children = useSelector(getStepChildren(step._id))

    if(step.duplicate) {
        if(children.length > 0) {
            return <ChildrenNextSteps nextSteps={children} />
        }

        else {
            return <NextStepsBlock step={step}/>
        }
    }
    
    return (
        <div
        onClick={e => selectStep(e, step)}
        key={step._id}
        style={stepStyle}
        className="next-step-item">
            <p className="step-name">
                {step.name}
            </p>
            <StepUnisList
            uniData={step.uniData} />
        </div>
    )
}

export default JumpToStepItem
