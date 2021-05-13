import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getGroupById } from '../../../../../../../../../redux/selectors/statsinputs'
import { GroupsContext } from '../../../../../GroupsContext'

function DisplayGroupName({ argValue }) {
    const group = useSelector(getGroupById(argValue))

    const {
        selectCustomGroup
    } = useContext(GroupsContext)
    const customGroup = useSelector(selectCustomGroup(argValue))
  
    return (
        <td>
            {group?.name || customGroup?.name}
        </td>
    )
}

export default DisplayGroupName
