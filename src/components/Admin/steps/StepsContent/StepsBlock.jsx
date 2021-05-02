import React, { useContext, useState } from 'react'
import { StepsContext } from '../../../steps/StepsContext'
import StepsTree from '../../../steps/StepsTree/StepsTree'
import AddStep from './AddSteps/AddStep'

function StepsBlock() {
    const {
        isStepsAdmin,
        pathId,
        selUnis,
        steps
    } = useContext(StepsContext)

    const [displayAdd, setDisplayAdd] = useState(false)

    const toggleAdd = toggle => {
        setDisplayAdd(toggle)
    }

    return (
        <div className="steps-block">
        {isStepsAdmin && pathId &&
            <AddStep 
            pathId={pathId}
            uniIds={selUnis} 
            steps={steps}
            display={displayAdd}
            toggleDisplay={toggleAdd}/>
        }
        
        <StepsTree />
        
    </div>
    )
}

export default StepsBlock
