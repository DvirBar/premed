import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSteps } from '../../../../redux/actions/steps'
import { stepsSelector } from '../../../../redux/selectors/steps'
import { addOrRemove } from '../../../../utils/arrays'
import InlineSelect from '../../../common/InlineSelect'
import StepsBlock from './StepsBlock'
import TopSection from './TopSection'

function StepsContent({
    paths,
    unis,
    selPath,
    selectPath,
    selectStep
}) {
    const [selUnis, setSelUnis] = useState([])

    const selectUni = uniObj => {
        setSelUnis(addOrRemove(selUnis, uniObj.value))
    }

    useEffect(() => {
        setSelUnis(unis.map(uni => uni._id))
    }, [unis])

    return (
        <div className="steps-content">
            <TopSection 
            paths={paths}
            selPath={selPath}
            selectPath={selectPath}
            unis={unis}
            selectUni={selectUni}
            selUnis={selUnis} />

            <StepsBlock
            selPath={selPath}
            selUnis={selUnis}
            selectStep={selectStep} />
        </div>
    )
}

export default StepsContent
