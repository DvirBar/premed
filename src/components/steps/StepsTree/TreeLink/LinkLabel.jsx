import React, { useContext } from 'react'
import { StepsContext } from '../../StepsContext'
import AddLinkLabel from './AddLinkLabel'

function LinkLabel({ 
    step, 
    color, 
    position, 
    isMulti, 
    length, 
    index }) {

    const {
        isStepsAdmin
    } = useContext(StepsContext)

    const middlePoint = (length / 2) - 0.5
    const ratio = index < middlePoint 
    ? index : length - (index + 1)
    const offSet = isMulti 
    ? `${(100/length)*ratio - 8}%` 
    : `${70}px` 

    const rightOrLeft = index < middlePoint
    ?   { right: offSet } : { left: offSet }

    const labelStyle = {
        color,
        top: position.top + 'px',
        ...rightOrLeft
    }
    
    return (
        <div
        style={labelStyle}
        className="link-label">
            {isStepsAdmin
            ?   <AddLinkLabel
                 step={step} />
            :   <div 
                className="link-label-name">
                    {step.linkLabel}
                </div>
            }
        </div>
    )
}

export default LinkLabel
