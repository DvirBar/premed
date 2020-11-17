import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArgsMissingList from './ArgsMissingList';
import useMissingArgs from './useMissingArgs';

function CalcBlock({ field, dataVals, suggestValue }) {
    const storedCalcs = useSelector(state => state.calcs.storedCalcs)
    const [storedCalc, setStoredCalc] = useState([])
    const [calc, setCalc] = useState({})

    useEffect(() => {
        setCalc(field.calcOutput)
    }, [field])

    useEffect(() => {
        setStoredCalc(storedCalcs.find(storedCalc => 
            storedCalc.id === field.calcOutput.storedCalc))
    }, [storedCalcs, calc])

    const calcsMissing = useMissingArgs(storedCalcs, dataVals)

    const argsMissing = calcsMissing.find(missingItem => 
        missingItem.calc === storedCalc.id)

    

    return (
        <Fragment>
            {field && field.calcOutput.isSuggestion &&
                <fieldset className={argsMissing
                ? "calc-block missing"
                : "calc-block"}>
                    <legend>הצעה</legend>
                    {argsMissing
                    ?   <div> 
                            חסרים נתונים
                        </div>
                    :  <div>
                            {suggestValue}
                        </div>
                    }
                </fieldset>
            }
            {argsMissing &&
                <ArgsMissingList argsMissing={argsMissing.missing} />
            }
        </Fragment>
    )
}

export default CalcBlock
