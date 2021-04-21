import { Done } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertData } from '../../../../../../redux/actions/userdata'
import { selTableSelector } from '../../../../../../redux/selectors/userdata'

function AcceptCalc({ calcId, value, suggestedValue }) {
    const dispatch = useDispatch()

    const selTable = useSelector(selTableSelector)

    const isAccepted = Number(suggestedValue) === Number(value)

    const insertCalcValue = () => {
        if(!isAccepted) {
            const dataObj = {
                fieldId: calcId,
                isCalc: true,
                value: suggestedValue
            }
    
            dispatch(insertData(dataObj, selTable))
        }
    }

    return (
        <div 
        aria-label="קבלת השקלול"
        onClick={insertCalcValue}
        className={`accept-calc ${isAccepted ? 'accepted' : ''}`}>
            <Done fontSize="large" />
        </div>
    )
}

export default AcceptCalc
