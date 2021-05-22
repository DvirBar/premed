import React from 'react'
import { useSelector } from 'react-redux'
import { selectMarginThresholds } from '../../../../../redux/stats/datatables/selectors'
import AllThresholds from '../AllThresholds/AllThresholds'
import LastThreshold from '../ThresholdType/LastThreshold'
import OptionalThreshold from '../ThresholdType/OptionalThreshold'

function CalcThresholdsType({
    type,
    year,
    calc
}) {
    const marginThresholds = useSelector(selectMarginThresholds(year, calc._id, type.key))

    const thresholdsSort = [
        {
            name: "גל ראשון",
            key: "isInitial"
        },
        {
            name: "סופי",
            key: "isFinal"
        }
    ]


    return (
        <div className={`calc-threshods-type ${type.key}`}>
            <div className="calc-threshods-type__label">
                {type.name}
            </div>

            {marginThresholds.length === 0
            ?   <div className="no-margin-thresholds">
                    <span>אין סכמים זמינים</span>
                </div>
        
            :   <div className="calc-threshods-type__content">
                {marginThresholds.length < 2 &&
                    <LastThreshold 
                    type={type.key}
                    calcId={calc._id}
                    year={year} />
                }
                <div className="calc-threshods-type__content__list">
                    {thresholdsSort.map(sort => 
                        <OptionalThreshold 
                        key={sort.key} 
                        sort={sort}
                        type={type.key}
                        thresholds={marginThresholds} />
                    )}
                </div>
            </div>}

            <AllThresholds
            type={type}
            year={year}
            calc={calc} />
        </div>
    )
}

export default CalcThresholdsType
