import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getFirstSteps } from '../../../redux/selectors/steps'
import { StepsContext } from '../StepsContext'
import StepsLevel from './StepsLevel'
import StepSummary from './step-summary/StepSummary'
 
function StepsGroup({ parent, isTopLevel }) {
    const firstSteps = useSelector(getFirstSteps(parent._id))
    const {
        selectStep,
        isStepsAdmin
    } = useContext(StepsContext)
    
    return (
        <div 
        className={`steps-group 
        ${isTopLevel ?  'top-level' : 'nested'}`}>
            <div className={`wrapper 
            ${isTopLevel ? '' : 'nested'}`}>
                {!isTopLevel &&
                    <p 
                    onClick={e => selectStep(parent, e)}
                    className="steps-group-name">
                        {parent.name}
                    </p>
                }
                {firstSteps?.length > 0 &&
                    <StepsLevel 
                    nextSteps={firstSteps} />
                }
            </div>
            
            <div className="wrapper">
                <StepSummary
                stepId={parent._id}
                summaries={parent.summaries} />     
            </div>
        </div>  
    )
}

export default StepsGroup
