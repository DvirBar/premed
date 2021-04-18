import { Done } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertData } from '../../../../../../redux/actions/userdata'
import { selTableSelector } from '../../../../../../redux/selectors/userdata'
import ToolTip from '../../../../../layout/ToolTip'

function AcceptCalc({ calcId, value, accepted }) {
    const dispatch = useDispatch()

    const selTable = useSelector(selTableSelector)

    const insertCalcValue = () => {
        if(!accepted) {
            const dataObj = {
                fieldId: calcId,
                isCalc: true,
                value,
                suggestedAccepted: true
            }
    
            dispatch(insertData(dataObj, selTable))
        }
    }

    return (
        <div 
        aria-label="קבלת השקלול"
        onClick={insertCalcValue}
        className={`accept-calc ${accepted ? 'accepted' : ''}`}>
            <Done fontSize="large" />
        </div>
    )
}

export default AcceptCalc
