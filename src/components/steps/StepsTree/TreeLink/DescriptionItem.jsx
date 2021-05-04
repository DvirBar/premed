import React from 'react'
import { useSelector } from 'react-redux'
import { getStepById } from '../../../../redux/selectors/steps'

function DescriptionItem({ descItem, index }) {
    const step = useSelector(getStepById(descItem.step))
    
    return (
        <g>
            <text>{step.name}</text>
            <text>{descItem.ratio}</text>
        </g>
    )
}

export default DescriptionItem
