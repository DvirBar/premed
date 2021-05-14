import React, { useContext } from 'react'
import { StepsContext } from '../../StepsContext'
import SingleLink from './SingleLink'

function LinkSplit({ 
    isEven, 
    step,
    length,
    middlePoint, 
    index,
    startX,
    startY,
    nodeX }) {

    const endY = 150
    const isStraight = !isEven && middlePoint === index

    const newIndex = (length % 2 === 0 && index > middlePoint) 
        ? index + 1 : index
 
    const pathCords = {
        startX,
        startY,
        endX: (nodeX/2) + (newIndex * nodeX),
        endY,
        length: 210
    }

    const {
        getTreeColor
    } = useContext(StepsContext)

    const color = getTreeColor(step.uniData)
        
    return (
        <SingleLink
        pathCords={pathCords}
        isBezier={!isStraight}
        color={color} />
    )
}

export default React.memo(LinkSplit)