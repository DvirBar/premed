import { Info } from '@material-ui/icons'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { getFieldValSimulated, getTableYear } from '../../../../../redux/selectors/userdata'
import { CalculatorContext } from '../CalculatorContext'

function CalcItem({ calc, uniColor }) {
    const valueObj = useSelector(getFieldValSimulated(calc._id))
    const style = {
        backgroundColor: uniColor + '30'
    }

    const styleSelected = {
        backgroundColor: uniColor,
        color: '#fff'
    }

    const calcVersions  = calc.versions
    const tableYear = useSelector(getTableYear)

    const calcYear = calc.versions?.includes(tableYear) 
    ? tableYear : tableYear - 1


    const {
        values,
        setDisplay
    } = useContext(CalculatorContext)

    const isSelected = values.calc?._id === calc._id
    
    const handleInfoToggle = () => {
        if(calc?.versions || 
           calc?.reverseCalcs || 
           valueObj?.payload) {

            if(isSelected) {
                setDisplay(false)            
            }
    
            else {
                setDisplay(true, valueObj, calc)
            }
    
        }
    }


    return (
        <div 
        style={isSelected ? styleSelected : style}
        onClick={handleInfoToggle}
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
    


export default CalcItem
