import React, { Fragment } from 'react'

function LinkSplit({ 
    isEven, 
    middlePoint, 
    index,
    color }) {
    const startX = 150
    const endY = 150

    let distFromMiddle = Math.abs(middlePoint - index) / 2

    const xAxisUnits = distFromMiddle/middlePoint * startX
    
    const endX = index > middlePoint ? 50 : 250
        
    return (
        <Fragment>
            {!isEven && middlePoint === index
            ?   <path d="M 150 0 V 210" 
                stroke={color} 
                stroke-width='5' 
                fill="transparent"/>

            :   <path d={`
                    M ${startX} 10 
                    C ${startX} ${endY/2}, 
                      ${endX} ${endY/2}, 
                      ${endX} ${endY}`
                    } 
                stroke={color} 
                stroke-width='5' 
                fill="transparent"/>

            }
            
        </Fragment>
    )
}

export default LinkSplit
