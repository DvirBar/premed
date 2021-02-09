import React, { useContext } from 'react'
import { StepsContext } from '../../StepsContext'
import AddLinkLabel from './AddLinkLabel'

function LinkLabel({ step, color }) {
    const {
        isStepsAdmin
    } = useContext(StepsContext)

    const labelStyle = {
        color
    }
    
    return (
        <div className="link-label">
            {isStepsAdmin
            ?   <AddLinkLabel
                 step={step} />
            :   <div 
                style={labelStyle}
                className="link-label-name">
                    {step.linkLabel}
                </div>
            }
        </div>
    )
}

export default LinkLabel
