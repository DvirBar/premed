import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { selTableSelector } from '../../../../redux/selectors/userdata'
import { GroupsContext } from './GroupsContext'

function RemoveVals({ 
    groupId, 
    cusGroupParent, 
    fieldId, 
    removeAll,
    isStaged }) {
    const selTable = useSelector(selTableSelector)
    const {
        execRemoveVals
    } = useContext(GroupsContext)
    
    const removeVals = () => {
        const data = {
            groupId,
            cusGroupParent,
            fieldId,
            removeAll
        }

        execRemoveVals(data, isStaged, selTable)
    }

    return (
        <div className="remove-vals">
            <i 
            onClick={() => removeVals()}
            className="material-icons remove">
                close
            </i>
        </div>
    )
}

export default RemoveVals
