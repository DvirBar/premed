import React, { useContext } from 'react'
import { StepsContext } from '../../StepsContext'
import AddLinkLabel from './AddLinkLabel'

function LinkLabel({ step }) {
    const {
        isStepsAdmin
    } = useContext(StepsContext)
    
    return (
        <div className="link-label">
            {isStepsAdmin
            ?   <AddLinkLabel
                 step={step} />
            :   <div className="link-label-name">
                    {step.linkLabel}
                </div>
            }
        </div>
    )
}

export default LinkLabel
