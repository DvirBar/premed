import React, { useContext, useEffect, useRef, useState } from 'react'
import useWindowDim from '../../../common/useWindowDim'
import { StepsContext } from '../../StepsContext'
import AddLinkLabel from './AddLinkLabel'

function LinkLabel({ 
    length,
    step, 
    color, 
    position, 
    index,
    nodeX }) {

    const {
        isStepsAdmin
    } = useContext(StepsContext)

    const ref = useRef()

    const {
        width: winWidth
    } = useWindowDim()

    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(ref.current?.clientWidth)
    }, [ref.current, index, winWidth])

    const middlePoint = (length / 2) - 0.5

    const newIndex = (length % 2 === 0 && index > middlePoint) 
        ? index + 1 : index


    const labelStyle = {
        color,
        top: position.top + 'px',
        right: (nodeX/2) + (newIndex * nodeX) - (width/2),
        transition: 'right 0.2s ease-in-out'
    }

    const nameStyle = {
        borderColor: color
    }
    
    return (
        <div
        ref={ref}
        style={labelStyle}
        className="link-label">
            {isStepsAdmin
            ?   <AddLinkLabel
                 step={step} />
            :   <div 
                style={nameStyle}
                className="link-label-name">
                    {step.linkLabel}
                </div>
            }
        </div>
    )
}

export default LinkLabel
