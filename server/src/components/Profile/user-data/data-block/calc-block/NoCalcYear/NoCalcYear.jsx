import React from 'react'
import { useSelector } from 'react-redux'
import { getTableYear } from '../../../../../../redux/selectors/userdata'

function NoCalcYear() {
    const tableYear = useSelector(getTableYear)
    return (
        <div className="no-calc-year">
            <div className="no-calc-year__main">
                השקלול לשנת {tableYear} עדיין לא זמין
            </div>
        </div>
    )
}

export default NoCalcYear
