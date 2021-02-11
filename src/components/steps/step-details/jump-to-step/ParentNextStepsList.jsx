import React from 'react'
import { useSelector } from 'react-redux'
import { getNextSteps, getStepById } from '../../../../redux/selectors/steps'
import NextStepsList from './NextStepsList'

function ParentNextStepsList({ parentId }) {
    const nextSteps = useSelector(getNextSteps(parentId))
    return (
        <NextStepsList
        nextSteps={nextSteps} />
    )
}

export default ParentNextStepsList
