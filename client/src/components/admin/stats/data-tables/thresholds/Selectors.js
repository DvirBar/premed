import React, { useState } from 'react'
import PathsSelector from '../../../../common/PathsSelector'
import SelectCalcs from './SelectCalcs'
import SelectUnis from './SelectUnis'

function Selectors({ selectField }) {
    const [selPath, setSelPath] = useState({})

    const [selUni, setSelUni] = useState({})

    const selectPath = path => {
        setSelPath(path)
        setSelUni({})
        selectField({})
    }

    return (
        <div className="thresholds-selectors">
            <PathsSelector 
            selPath={selPath.value}
            selectPath={selectPath} />
            <div className="uni-calcs-selectors">
                <SelectUnis
                pathId={selPath.value}
                selectUni={setSelUni} />
                
                <SelectCalcs
                pathId={selPath.value} 
                uniId={selUni.value}
                selectField={selectField} />
            </div>
        </div>
    )
}

export default Selectors
