import React, { useRef, useState } from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { selectCalcThresholds } from '../../../../../redux/stats/datatables/selectors'
import Button from '../../../../common/buttons/Button/Button'
import useOnClickOutside from '../../../../common/useOnClickOutside'
import AllThresholdsItem from './AllThresholdsItem'

function AllThresholds({ calc, type, year }) {
    const [display, setDisplay] = useState(false)
    const thresholds = useSelector(selectCalcThresholds(year, calc._id, type.key))

    const ref = useRef()
    useOnClickOutside(ref, display, () => setDisplay(false))

    if(thresholds.length < 2) {
        return <Fragment></Fragment>
    }

    return (
        <div className="all-thresholds">
            <Button 
            className="all-thresholds__button"
            onClick={() => setDisplay(true)}
            label="כל הסיפים" />
            <div className={`all-thresholds__wrapper ${display ? 'display' : ''}`}>
                <div 
                ref={ref} 
                className="all-thresholds__container">
                    <div className="all-thresholds__container__list scrollbar-main">
                        {thresholds.map(threshold => 
                            <AllThresholdsItem
                            key={threshold._id}
                            type={type}
                            threshold={threshold} />
                        )}
                    </div>
                </div>               
            </div>
        </div>
    )
}

export default AllThresholds
