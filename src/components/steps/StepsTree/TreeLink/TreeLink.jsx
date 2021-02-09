import React from 'react'
import LinkSplit from './LinkSplit'

function TreeLink({ nextSteps, linkWidth, color }) {
    const length = nextSteps.length
    const isEven = length % 2 === 0
    const middlePoint = (length / 2) - 0.5
    const multiNext = nextSteps.length > 1

    const mainLinkHeight = 70
    const splitLinkHeight = 150
    const svgHeight = multiNext ? splitLinkHeight : mainLinkHeight

    return (
        <svg 
        width={linkWidth} 
        height={svgHeight} 
        xmlns="http://www.w3.org/2000/svg">
            {!multiNext 
            ?   <path 
                d={`M 150 0 V ${mainLinkHeight}`} 
                stroke={color} 
                stroke-width='5' 
                fill="transparent"/>

            
            :   <g>
                    {nextSteps.map((step, index) =>
                        <LinkSplit
                        key={step._id}
                        middlePoint={middlePoint}
                        isEven={isEven}
                        index={index}
                        color={color} />
                    )}
                </g>
            }
        </svg>
    )
}

export default TreeLink
