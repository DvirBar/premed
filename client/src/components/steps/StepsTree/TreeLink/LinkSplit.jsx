import React from 'react'
import SingleLink from './SingleLink'

function LinkSplit({ 
    isEven, 
    length,
    middlePoint, 
    index,
    startX,
    startY,
    color,
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

    console.log(pathCords);
        
    return (
        <SingleLink
        pathCords={pathCords}
        isBezier={!isStraight}
        color={color} />
    )
}

export default LinkSplit
