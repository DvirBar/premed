import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSteps } from '../../../../redux/actions/steps'
import { stepsSelector } from '../../../../redux/selectors/steps'
import StepsTree from '../../../steps/StepsTree/StepsTree'
import AddStep from './AddSteps/AddStep'

function StepsBlock({
    selPath,
    selUnis,
    selectStep
}) {
    const [displayAdd, setDisplayAdd] = useState(false)

    const toggleAdd = toggle => {
        setDisplayAdd(toggle)
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if(selPath && selUnis.length > 0) {
            dispatch(getSteps(selPath.value, selUnis))
        }
    }, [selPath, selUnis])

    const steps = useSelector(stepsSelector)

    return (
        <div className="steps-block">
        {selPath.value &&
            <AddStep 
            pathId={selPath.value}
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
