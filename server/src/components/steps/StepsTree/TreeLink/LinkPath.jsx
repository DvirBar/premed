import React from 'react'
import LinkSplit from './LinkSplit'
import SingleLink from './SingleLink'

function LinkPath({ 
    linkWidth, 
    svgHeight, 
    multiNext, 
    pathCords, 
    color,
    nextSteps}) {
        const length = nextSteps.length
        const isEven = length % 2 === 0

        const middlePoint = (length / 2) - 0.5
    return (
        <svg 
        width={linkWidth} 
        height={svgHeight} 
        xmlns="http://www.w3.org/2000/svg">
            {!multiNext 
            ?   <SingleLink
                pathCords={pathCords}
                color={color} />
            
            :   <g>
                    {nextSteps.map((step, index) =>
                        <LinkSplit
                        key={step._id}
                        middlePoint={middlePoint}
                        isEven={isEven}
                        index={index}
                        startX={pathCords.startX}
                        startY={pathCords.startY}
                        color={color} />
                    )}
                </g>
            }
        </svg>
    )
}

export default LinkPath
