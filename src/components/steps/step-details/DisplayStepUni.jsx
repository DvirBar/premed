import React from 'react'
import { useSelector } from 'react-redux'
import { getUniById } from '../../../redux/selectors/unis'

function DisplayStepUni({ uniId }) {
    const uni = useSelector(getUniById(uniId))
    
    return (
        <span>
            ({uni?.name})
        </span>
    )
}

export default DisplayStepUni
