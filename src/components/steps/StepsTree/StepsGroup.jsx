import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getFirstSteps, getNextSteps } from '../../../redux/selectors/steps'
import { StepsContext } from '../StepsContext'
import StepsLevel from './StepsLevel'
 
function StepsGroup({ parent, isTopLevel }) {
    const firstSteps = useSelector(getFirstSteps(parent._id))
    const {
        selectStep
    } = useContext(StepsContext)
    
    return (
        <div 
        className={`steps-group 
        ${isTopLevel ?  'top-level' : 'nested'}`}>
            <div className={`group-wrapper 
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
        </div>
    )
}

export default StepsGroup
