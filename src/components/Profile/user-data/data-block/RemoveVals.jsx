import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeValue } from '../../../../redux/actions/userdata'
import { selTableSelector } from '../../../../redux/selectors/userdata'

function RemoveVals({ 
    groupId, 
    cusGroupParent, 
    fieldId, 
    removeAll,
    isStaged, 
    removeStagedGroup }) {
    const dispatch = useDispatch()
    const selTable = useSelector(selTableSelector)
    
    const execRemoveVals = () => {
        if(!isStaged) {
            const data = {
                groupId,
                cusGroupParent,
                fieldId,
                removeAll
            }
    
            dispatch(removeValue(data, selTable))    
        }

        else {
            removeStagedGroup(groupId)
        }
    }

    return (
        <div className="remove-vals">
            <i 
            onClick={() => execRemoveVals()}
            className="material-icons remove">
                close
            </i>
        </div>
    )
}

export default RemoveVals
