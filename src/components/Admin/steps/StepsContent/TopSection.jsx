import React, { useContext, useEffect, useState } from 'react'
import InlineSelect from '../../../common/InlineSelect'
import { StepsContext } from '../../../steps/StepsContext'
import UnisChoose from '../../../steps/unis-choose/UnisChoose'

function TopSection({ paths }) {
    const [pathOptions, setPathOptions] = useState([])

    useEffect(() => {
        setPathOptions(paths.map(path => ({
            name: path.name,
            value: path._id
        })))
    }, [paths])

    const {
        isStepsAdmin,
        pathId,
        selUnis,
        selectPath,
        selectUni,
        unis
    } = useContext(StepsContext)

    return (
        <div className="steps-top-section">
            {isStepsAdmin &&
                <p className="path-select">
                    <InlineSelect 
                    options={pathOptions}
                    selected={pathId}
                    selectOption={selectPath} />
                </p>
            }

            <div className={`uni-container
            ${!isStepsAdmin ? 'client' : ''}`}>
                <UnisChoose
                unis={unis}
                selectUni={selectUni}
                selUnis={selUnis} />
            </div>
        </div>
    )
}

export default TopSection
