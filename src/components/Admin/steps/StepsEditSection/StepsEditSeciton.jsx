import React, { useContext, useEffect } from 'react'
import { StepsContext } from '../../../steps/StepsContext'

function StepsEditSeciton() {
    const {
        selStep 
    } = useContext(StepsContext)
    console.log(selStep);
    return (
        <div>
        </div>
    )
}

export default StepsEditSeciton
