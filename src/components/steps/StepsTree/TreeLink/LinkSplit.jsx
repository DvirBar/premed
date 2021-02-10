import React, { Fragment } from 'react'
import SingleLink from './SingleLink'

function LinkSplit({ 
    isEven, 
    middlePoint, 
    index,
    startX,
    startY,
    color }) {
    const endX = index > middlePoint ? 50 : 250
    const endY = 150
    
    const isStraight = !isEven && middlePoint === index

    const pathCords = {
        startX,
        startY,
        endX,
        endY,
        length: 210
    }
        
    return (
        <SingleLink
        pathCords={pathCords}
        isBezier={!isStraight}
        color={color} />
    )
}

export default LinkSplit
