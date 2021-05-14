import React from 'react'
import TreeNode from './TreeNode'

function StepsLevel({ nextSteps, width, duplicateParent }) {
    const levelWidth = {
        width
    }
    
    return (
        <div 
        style={levelWidth}
        className="steps-level">
            {nextSteps.map(step =>
                <TreeNode
                key={step._id}
                duplicateParent={duplicateParent}
                step={step}
                length={nextSteps.length} />
            )}
        </div>
    )
}

export default StepsLevel
