import { getFieldMinMaxValues } from "../../../../../../../../redux/selectors/statsinputs"

const calculateReverse = (
    calculatedField, 
    fieldsValues, 
    calcRecog, 
    year,
    threshold
) => {

    let result = Number(threshold.value)
    let finalValue 

    Object.keys(calcRecog).map(key => {
        const recogItem = calcRecog[key]
        
        let valueToUse 
        if(recogItem.hasYear) {
            valueToUse = Number(recogItem?.coef[year])
        }

        else {
            valueToUse = Number(recogItem?.coef)
        }

        if(key !== 'intercept' && key !== calculatedField._id) {
            const valueToSub = valueToUse * fieldsValues.find(val => val.field === key)?.value
            result -= valueToSub
        }

        else if(key === 'intercept') {
            result -= valueToUse
        }

        else if(key === calculatedField._id) {
            finalValue = valueToUse
        }
    })



    result = result / finalValue
    
    // Find field max value
    const {
        max: maxValue
    } = getFieldMinMaxValues(calculatedField)

    if(result > maxValue) {
        return `גבוה מהמקסימום (${maxValue})`
    }

    const fractionDigits = Math.pow(10, Number(calculatedField.fractionDigits) || 0)
    const ceiledValue = Math.ceil(result * fractionDigits) / fractionDigits
    if(ceiledValue > maxValue) {
        return maxValue
    }
    
    return ceiledValue
}

export default calculateReverse