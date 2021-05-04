import React from 'react'
import useStepsClient from '../../hooks/useStepsClient'
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
