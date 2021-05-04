import React, { useContext } from 'react'
import { StepsContext } from '../../../steps/StepsContext'
import EditStep from './EditStep'


function StepsEditSeciton() {
    const {
        displayEdit,
        toggleEdit
    } = useContext(StepsContext)

    return (
        <div>
            <EditStep
            display={displayEdit}
            toggleDisplay={toggleEdit} />
        </div>
    )
}

export default StepsEditSeciton
