import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeValue } from '../../../../redux/actions/userdata'
import { selTableSelector } from '../../../../redux/selectors/userdata'
import ToolTip from '../../../layout/ToolTip'

function RemoveVals({ groupId, cusGroupParent, fieldId, removeAll, text }) {
    const dispatch = useDispatch()
    const selTable = useSelector(selTableSelector)
    
    const execRemoveVals = () => {
        const data = {
            groupId,
            cusGroupParent,
            fieldId,
            removeAll
        }

        dispatch(removeValue(data, selTable))
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
