import React from 'react'
import { useSelector } from 'react-redux'
import { getGroupById } from '../../../../../../../../../redux/selectors/statsinputs'

function DisplayGroupName({ argValue }) {
    const group = useSelector(getGroupById(argValue))
  
    return (
        <td>
            {group.name}
        </td>
    )
}

export default DisplayGroupName
