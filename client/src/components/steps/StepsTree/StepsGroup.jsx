import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { StepsContext } from '../StepsContext'
import StepsLevel from './StepsLevel'
import StepSummary from './step-summary/StepSummary'
import { getFirstSteps } from '../../../redux/selectors/steps'
 
function StepsGroup({ parent, isTopLevel, color, childrenGroup }) {
    const {
        selectStep
    } = useContext(StepsContext)

    const firstSteps = useSelector(getFirstSteps(parent?._id))

    const groupStyle = {
        backgroundColor: color + '20',
    }

    const groupNameStyle = {
        color,
        borderColor: color + '90'
    }

    return (
        <div 
        className={`steps-group 
        ${isTopLevel ?  'top-level' : 'nested'}`}>
            <div 
            className={`wrapper 
            ${isTopLevel ?  'top-level' : 'nested'}`}
            style={!isTopLevel ? groupStyle : {}}>
                <div 
                style={groupNameStyle}
                onClick={e => selectStep(e, parent)}
                className="steps-group-name">
                    <span>
                        {parent.name}
                    </span>
                </div>
                <div className="group-content">
                    {firstSteps?.length > 0 &&
                        <StepsLevel 
                        childrenGroup={childrenGroup}
                        isGroup={true}
                        nextSteps={firstSteps} />
                    }

                    <StepSummary
                    color={color}
                    stepId={parent._id}
                    summaries={parent.summaries} />     
                </div>
            </div>
        </div>  
    )
}

export default StepsGroup
