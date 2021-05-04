import React from 'react'
import ThreshGroupContent from './ThreshGroupContent'
import ThreshItem from './ThreshItem'

function ThreshGroup({ threshGroup, groupsNum, width, color }) {
    const { threshes, index } = threshGroup 
    const relativeNum =  groupsNum / Math.ceil(groupsNum)
    const groupX = (index - 1) * relativeNum * width
    
    const groupStyle = {
        width,
        left: groupX
    }

    return (
        <div
        className="thresh-group"
        style={groupStyle}>
            {threshes.length === 1 
            ?   <ThreshItem
                color={color}
                thresh={threshes[0]} />
            
            :   <ThreshGroupContent
                color={color}
                threshes={threshes} />
            }

            <i className="material-icons indicator">
                arrow_drop_down
            </i>
        </div>
    )
}

export default ThreshGroup
