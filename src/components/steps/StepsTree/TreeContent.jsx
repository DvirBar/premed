import React from 'react'
import StepsLevel from './StepsLevel';

function TreeContent({ firstStep }) {
    return (
        <div className="steps-tree-wrapper">
            <div className="steps-tree noselect">
                <StepsLevel
                nextSteps={[firstStep]}/>
            </div>
        </div>
        
    )
}

export default TreeContent
