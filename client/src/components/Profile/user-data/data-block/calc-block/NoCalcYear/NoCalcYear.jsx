import React, { useState } from 'react'
import DisplayValidError from '../NoCalc/DisplayValidError/DisplayValidError'
import NoCalc from '../NoCalc/NoCalc'
import OtherCalcs from '../SuggestedCalc/OtherCalcs/OtherCalcs'

function NoCalcYear({ calc, tableYear, validError }) {
    const [displayOther, setDisplayOther] = useState(false)
    
    return (
        <div className="no-calc-year">
            <div className="no-calc-year__main">
                אין שקלול ל-{tableYear}
            </div>
            {calc.versions.includes(tableYear-1) &&
                <div className="other-calcs">
                    <span 
                    onClick={() => setDisplayOther(true)}
                    className="other-calcs__link">
                        (שנה קודמת)
                    </span>
                    {validError
                    ?   <DisplayValidError
                        title={calc.name}
                        display={displayOther}
                        setDisplay={setDisplayOther}
                        error={validError} />
                    :   <OtherCalcs
                        display={displayOther}
                        setDisplay={setDisplayOther}
                        calc={calc} />
                    }
                   
                </div>
            }
            
        </div>
    )
}

export default NoCalcYear
