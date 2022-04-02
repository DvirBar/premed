import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EXEC_CALC } from '../../../../../redux/actions/types'
import { executeCalc } from '../../../../../redux/actions/userdata'
import { isLoading } from '../../../../../redux/loader/selectors'
import { getTableYear, selTableSelector } from '../../../../../redux/selectors/userdata'
import { selectTableById } from '../../../../../redux/stats/datatables/selectors'
import Loadbar from '../../../../layout/Loadbar'
import { GroupsContext } from '../GroupsContext'
import NoCalc from './NoCalc/NoCalc'
import NoCalcYear from './NoCalcYear/NoCalcYear'
import SuggestedCalc from './SuggestedCalc/SuggestedCalc'

function CalcBlock({ calc, value, suggestedValue, payload }) {
    const {
        getErrorByCalc
    } = useContext(GroupsContext)

    const validError = useSelector(getErrorByCalc(calc._id))
    const tableYear = useSelector(getTableYear)
    const calcVersions = calc.versions
    const loading = useSelector(isLoading(EXEC_CALC, calc._id))

    const [retry, setRetry] = useState(false);

    const selTableId = useSelector(selTableSelector);
    const selTable = (useSelector(selectTableById(selTableId))); 
    
    const dispatch = useDispatch();

    if(!retry && !suggestedValue && !selTable.enabled && !validError) {
        console.log(selTable);
        setRetry(true);
        dispatch(executeCalc([[calc._id]]));
    }

    return (
        <div className="calc-block-new">
            {!calcVersions || calcVersions.includes(tableYear)
            ? validError
                ?   <NoCalc 
                    calcName={calc.name}
                    validError={validError} />   
                :   loading
                    ?   <div className="calc-block-new__loader">
                            <Loadbar small={true} />
                        </div>
                    :   suggestedValue 
                        ?   <SuggestedCalc
                            suggestedValue={suggestedValue}
                            value={value} 
                            calc={calc}
                            payload={payload} />

                    :   <div className="no-value-error">
                        התרחשה תקלה, נסו להזין את אחד הנתונים שוב
                        </div>
            :   <NoCalcYear 
                calc={calc} 
                validError={validError}
                tableYear={tableYear} />
            }
        </div>
    )
}

export default CalcBlock
