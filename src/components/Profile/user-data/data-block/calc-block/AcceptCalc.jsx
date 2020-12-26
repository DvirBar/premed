import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { insertData } from '../../../../../redux/actions/userdata'
import { selTableSelector } from '../../../../../redux/selectors/userdata'

function AcceptCalc({ calcId, value, accepted }) {
    const dispatch = useDispatch()

    const selTable = useSelector(selTableSelector)

    const insertCalcValue = () => {
        const dataObj = {
            fieldId: calcId,
            isCalc: true,
            value,
            suggestedAccepted: true
        }

        dispatch(insertData(dataObj, selTable))
    }

    return (
        <Fragment>
            {accepted
            ?   <div className="suggest-accept-note">
                    <i className="material-icons">
                        done
                    </i>
                    <span>
                        קיבלת את השקלול
                    </span>
                </div>
           
            :   <div 
                className="calc-button accept"
                onClick={() => insertCalcValue()}>
                    <i className="material-icons">
                        done
                    </i>
                    <span>
                        קבלת שקלול
                    </span>
                </div>
            }    
        </Fragment>
        
    )
}

export default AcceptCalc
