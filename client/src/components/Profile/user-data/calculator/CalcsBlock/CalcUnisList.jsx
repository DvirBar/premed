import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { SIMULATE_CALCS } from '../../../../../redux/actions/types'
import { isLoading } from '../../../../../redux/loader/selectors'
import { getUnisByCalcs } from '../../../../../redux/selectors/unis'
import Loadbar from '../../../../layout/Loadbar'
import CalcItem from './CalcItem'

function CalcUnisList({ 
    calcs, 
    changeStartSimulate }) {
    
    const unis = useSelector(getUnisByCalcs(calcs))

    const loading = useSelector(isLoading(SIMULATE_CALCS))

    return (
        <div className="calcs-unis-list">
            <div className="calcs-list scrollbar-main">
                {unis.map(uni => 
                    <div 
                    key={uni._id}
                    className="calc-uni-item">
                        <span className="uni-name">
                            {uni.name}
                        </span>
                        <div className="uni-calcs-list">
                            {calcs.map(calc => 
                                calc.uni === uni._id &&
                                <CalcItem
                                key={calc._id}
                                calc={calc}
                                uniColor={uni.color} />
                            )}                        
                        </div>
                    </div>
                )}
            </div>
            <div
            className="exec-sim-calcs"
            onClick={() => changeStartSimulate(true)}>
                {loading 
                ?   <Loadbar invert={true} small={true} />
                :   <i className="material-icons">
                        navigate_before
                    </i>
                }
            </div>
        </div>
    )
}

export default CalcUnisList
