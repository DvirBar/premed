import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArgsMissingList from './ArgsMissingList';
import useMissingArgs from './useMissingArgs';

function CalcBlock({ field, dataVals, value }) {
    const storedCalcs = useSelector(state => state.calcs.storedCalcs)
    const [storedCalc, setStoredCalc] = useState([])
    const [calc, setCalc] = useState({})

    useEffect(() => {
        setCalc(field.calcOutput)
    }, [field])

    useEffect(() => {
        setStoredCalc(storedCalcs?.filter(storCalc => 
            storCalc.id === field.calcOutput.storedCalc))
    }, [storedCalcs, calc])

    const argsMissing = useMissingArgs(storedCalc, dataVals)

    return (
        <Fragment>
            {field && field.calcOutput.isSuggestion &&
                <fieldset className={argsMissing?.length === 0 
                ? "calc-block"
                : "calc-block missing"}>
                    <legend>הצעה</legend>
                    {argsMissing?.length === 0 
                    ?  <div>
                            {value?.suggestValue}
                        </div>
                    :  <div> 
                        חסרים נתונים
                    </div>
                    }
                </fieldset>
            }
            {argsMissing && argsMissing.length !== 0 && 
                <ArgsMissingList argsMissing={argsMissing[0].missing} />
            }
        </Fragment>
    )
}

export default CalcBlock
