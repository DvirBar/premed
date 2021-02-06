import React from 'react'
import LinkSplit from './LinkSplit'

function TreeLink({ nextSteps, linkWidth }) {
    const length = nextSteps.length
    const isEven = length % 2 === 0
    const middlePoint = (length / 2) - 0.5
    const multiNext = nextSteps.length > 1


    const mainLinkHeight = 70
    const splitLinkHeight = 210
    const multiLinkHeight = mainLinkHeight + splitLinkHeight
    const svgHeight = multiNext ? multiLinkHeight : mainLinkHeight

    return (
        <svg 
        width={linkWidth} 
        height={svgHeight} 
        xmlns="http://www.w3.org/2000/svg">
            <path 
            d={`M 150 0 V ${mainLinkHeight}`} 
            stroke="purple" 
            stroke-width='5' 
            fill="transparent"/>

            {multiNext &&
                <g transform={`translate(0, ${mainLinkHeight})`}>
                    {nextSteps.map((step, index) =>
                        <LinkSplit
                        key={step._id}
                        middlePoint={middlePoint}
                        isEven={isEven}
                        index={index} />
                    )}
                </g>}
        </svg>
    )
}

export default TreeLink
