import React from 'react'
import { useSelector } from 'react-redux'
import { getFirstSteps, getNextSteps } from '../../../redux/selectors/steps'
import StepsLevel from './StepsLevel'
 
function StepsGroup({ parent, isTopLevel }) {
    const firstSteps = useSelector(getFirstSteps(parent._id))
    return (
        <div className={`steps-group 
        ${isTopLevel ?  'top-level' : 'nested'}`}>
            <div className={`group-wrapper 
            ${isTopLevel ? '' : 'nested'}`}>
                {!isTopLevel &&
                    <p className="steps-group-name">
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
