import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { getNextSteps, getStepById } from '../../../../redux/selectors/steps'
import NextStepsList from './NextStepsList'

function ParentNextStepsList({ parentId }) {
    const nextSteps = useSelector(getNextSteps(parentId))
    const step = useSelector(getStepById(parentId))

    if(nextSteps.length > 0) {
        return (
            <NextStepsList
            nextSteps={nextSteps} />
        )
    }

    if(step.parent) {
        return (
            <ParentNextStepsList
            parentId={step.parent} />    
        )
    }
    
    return <Fragment></Fragment>
}

export default ParentNextStepsList
