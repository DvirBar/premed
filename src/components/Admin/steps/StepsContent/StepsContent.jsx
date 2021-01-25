import React, { useEffect, useState } from 'react'
import { addOrRemove } from '../../../../utils/arrays'
import StepsBlock from './StepsBlock'
import TopSection from './TopSection'

function StepsContent({
    paths,
    unis,
    selPath,
    selectPath
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
            selUnis={selUnis} />
        </div>
    )
}

export default StepsContent
