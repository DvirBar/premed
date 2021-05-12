import React, { useState } from 'react'
import OtherCalcs from '../SuggestedCalc/OtherCalcs/OtherCalcs'

function NoCalcYear({ calc, tableYear }) {
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
                    <OtherCalcs 
                    display={displayOther}
                    setDisplay={setDisplayOther}
                    calc={calc} />
                </div>
            }
            
        </div>
    )
}

export default NoCalcYear
