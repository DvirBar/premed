import React, { Fragment, useContext } from 'react'
import { useSelector } from 'react-redux'
import { getStepChildren } from '../../../redux/selectors/steps'
import StepsGroup from './StepsGroup'

function StepTopLevel({ step }) {
    const children = useSelector(getStepChildren(step._id))
    return (
        <div className="step-top-level">
            <div className="top-level-data">
                <p className="top-level-step-name">
                    {step.name}
                </p>
            </div>
            {children && children.length > 0 &&
                <StepsGroup
                isTopLevel={true}
                parent={step} />
            }
        </div>
    )        
}

export default StepTopLevel
