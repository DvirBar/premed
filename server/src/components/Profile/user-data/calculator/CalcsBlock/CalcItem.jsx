import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { getFieldValSimulated, getTableYear, hasCalcForYear } from '../../../../../redux/selectors/userdata'

function CalcItem({ calc, uniColor }) {
    const valueObj = useSelector(getFieldValSimulated(calc._id))
    const backgroundStyle = {
        backgroundColor: uniColor + '30'
    }

    const calcVersions  = calc.versions
    const hasCalc = useSelector(hasCalcForYear(calcVersions, calcVersions?.calcGap))
    const tableYear = useSelector(getTableYear)

    const calcYear = tableYear + calcVersions?.calcGap

    if(hasCalc) {
        return (
            <div 
            style={backgroundStyle}
            className="calculator-calc-item">
                <p className="calc-name">
                    {calc.name} {calcVersions && calcYear}
                </p>
                <p 
                className="calc-value">
                    {valueObj && 
                    (valueObj.value || '-')}
                </p>
            </div>
        )
    }
    
    return <Fragment></Fragment>
}

export default CalcItem
