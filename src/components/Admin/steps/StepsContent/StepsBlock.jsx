import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSteps } from '../../../../redux/actions/steps'
import { STEP } from '../../../../redux/actions/types'
import { isLoading } from '../../../../redux/loader/selectors'
import { stepsSelector } from '../../../../redux/selectors/steps'
import Loadbar from '../../../layout/Loadbar'
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
