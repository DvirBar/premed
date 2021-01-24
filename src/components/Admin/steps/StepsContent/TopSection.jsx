import React, { useEffect, useState } from 'react'
import InlineSelect from '../../../common/InlineSelect'
import UnisChoose from '../../../steps/unis-choose/UnisChoose'

function TopSection({ 
    paths, 
    selPath, 
    selectPath,
    unis,
    selectUni,
    selUnis}) {
        const [pathOptions, setPathOptions] = useState([])

        useEffect(() => {
            setPathOptions(paths.map(path => ({
                name: path.name,
                value: path._id
            })))
        }, [paths])


    return (
        <div className="steps-top-section">
             <p className="path-select">
                <InlineSelect 
                options={pathOptions}
                selected={selPath}
                selectOption={selectPath} />
            </p>

            <UnisChoose
            unis={unis}
            selectUni={selectUni}
            selUnis={selUnis} />
        </div>
    )
}

export default TopSection
