import React, { useEffect, useState } from 'react'
import SelectCalcs from './SelectCalcs'
import SelectPath from './SelectPath'
import SelectUnis from './SelectUnis'

function Selectors({ selectField }) {
    const [selPath, setSelPath] = useState({})
    const selectPath = path => {
        setSelPath(path)
    }

    const [selUni, setSelUni] = useState({})
    const selectUni = uni => {
        setSelUni(uni)
    }

    return (
        <div className="thresholds-selectors">
            <SelectPath
            selPath={selPath}
            selectPath={selectPath} />
            <div className="uni-calcs-selectors">
                <SelectUnis
                pathId={selPath.value}
                selectUni={selectUni} />
                
                <SelectCalcs
                pathId={selPath.value} 
                uniId={selUni.value}
                selectField={selectField} />
            </div>
        </div>
    )
}

export default Selectors
