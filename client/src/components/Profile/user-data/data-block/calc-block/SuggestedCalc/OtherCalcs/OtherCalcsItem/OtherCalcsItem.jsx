import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectMarginThresholds } from '../../../../../../../../redux/stats/datatables/selectors'
import LastYearCalc from '../LastYearCalc/LastYearCalc'
import ReverseCalcsList from '../RerverseCalcsList/ReverseCalcsList'
import RerverseCalcsThresholdsSelector from '../ReverseCalcsThreholdsSelector/RerverseCalcsThresholdsSelector'

function OtherCalcsItem({ calc, year }) {
    const thresholds = useSelector(selectMarginThresholds(year, calc._id, 'accept'))
    const [selectedThreshold, setSelectedThreshold] = useState(thresholds?.find(thresh =>
        thresh.isInitial || thresh.isFinal))

    if(thresholds?.length > 0 && selectedThreshold) {
        return (
            <div className="other-calcs__content__item">
                {(!calc.versions || calc.versions?.includes(year) )
                ?   <LastYearCalc 
                    calc={calc}
                    year={year}/>                    
                :   <div className="no-calc-available">
                        עדיין אין שקלול זמין
                    </div>
                }
                
                <RerverseCalcsThresholdsSelector
                calc={calc}
                thresholds={thresholds}
                selectedThreshold={selectedThreshold}
                setSelectedThreshold={setSelectedThreshold} />
                
                {(!calc.versions || calc.versions?.includes(year)) &&
                    <ReverseCalcsList 
                    threshold={selectedThreshold}
                    calc={calc}
                    year={year} />                    
                }
            </div>
        )
    }

    return (
        <div className="reverse-calcs__content__no-thresholds">
            עדיין אין סיפי קבלה זמינים לשנה זו
        </div>
    )
}

export default OtherCalcsItem
