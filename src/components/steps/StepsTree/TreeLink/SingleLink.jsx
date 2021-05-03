import React from 'react'

function SingleLink({ pathCords, isBezier, color }) {
    const {
        startX,
        startY,
        endX,
        endY,
        length
    } = pathCords

    return (
        <path d={`
                M ${startX} ${startY}
                ${isBezier 
                ?   `C ${startX} ${endY/2}, 
                        ${endX} ${endY/2}, 
                        ${endX} ${endY}`
                :   `V ${length}`
                }`} 
        stroke={color} 
        strokeWidth='5' 
        fill="transparent"/>
        
    )
}

export default SingleLink
