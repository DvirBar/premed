import React from 'react'
import NextStepsList from './NextStepsList'

function ChildrenNextSteps({ nextSteps }) {
    const stepsList = nextSteps?.filter(step =>
        !step.prev)

    return (
        <NextStepsList
        nextSteps={stepsList} />
    )
}

export default ChildrenNextSteps
