
const calculateLastYear = (
    fieldsValues, 
    calcRecog, 
    year,
    calcFraction
) => { 

    let result = 0
    Object.keys(calcRecog).map(key => {
        const recogItem = calcRecog[key]
        
        let valueToUse 
        if(recogItem.hasYear) {
            valueToUse = Number(recogItem.coef[year])
        }

        else {
            valueToUse = Number(recogItem?.coef)
        }

        if(key !== 'intercept') {
            const fieldToUse = fieldsValues.find(val => val.field === key)
            const fieldValue = fieldToUse?.value || fieldToUse?.suggestValue
            const valueToSub = valueToUse * fieldValue
            result += Number(valueToSub)
        }

        else if(key === 'intercept') {
            result += valueToUse
        }
    })

    const fixedValue = result.toFixed(calcFraction)

    return fixedValue
}

export default calculateLastYear