import React from 'react'
import { useSelector } from 'react-redux'
import { getUniById } from '../../../../redux/selectors/unis'

function StepUnisItem({ uniId }) {
    const uni = useSelector(getUniById(uniId))
    const color = uni?.color
    const uniColor = {
        backgroundColor: color
    }

    return (
        <span 
        className="step-unis-item"
        style={uniColor}>
            <span>{uni?.name}</span>
        </span>
    )
}

export default StepUnisItem
