import React, { Fragment, useContext } from 'react'
import { useSelector } from 'react-redux'
import { getNextSteps, getStepChildren } from '../../../redux/selectors/steps'
import StepsGroup from './StepsGroup'
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
