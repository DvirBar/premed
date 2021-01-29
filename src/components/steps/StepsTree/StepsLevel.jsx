import React from 'react'
import TreeNode from './TreeNode'

function StepsLevel({ nextSteps, levelWidth }) {
    const width = {
        width: levelWidth || '100%'
    }
    
    return (
        <div 
        style={width}
        className="steps-level">
            {nextSteps.map(step =>
                <TreeNode
                key={step._id}
                step={step}
                length={nextSteps.length} />
            )}
        </div>
    )
}

export default StepsLevel
