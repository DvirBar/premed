import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { StepsContext } from '../StepsContext'
import StepsLevel from './StepsLevel'
import StepSummary from './step-summary/StepSummary'
import { getFirstSteps } from '../../../redux/selectors/steps'
 
function StepsGroup({ parent, isTopLevel }) {
    const {
        selectStep
    } = useContext(StepsContext)

    const firstSteps = useSelector(getFirstSteps(parent?._id))

    return (
        <div 
        className={`steps-group 
        ${isTopLevel ?  'top-level' : 'nested'}`}>
            <div className={`wrapper 
            ${isTopLevel ?  'top-level' : 'nested'}`}>
                <div 
                onClick={e => selectStep(parent, e)}
                className="steps-group-name">
                    <span>
                        {parent.name}
                    </span>
                </div>
                <div className="group-content">
                    {firstSteps?.length > 0 &&
                        <StepsLevel 
                        nextSteps={firstSteps} />
                    }

                    <StepSummary
                    stepId={parent._id}
                    summaries={parent.summaries} />     
                </div>
            </div>
        </div>  
    )
}

export default StepsGroup
