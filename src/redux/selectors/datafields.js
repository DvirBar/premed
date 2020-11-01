export const getFieldsByArgs = (fields, calcs) => {
    const fieldArr = fields.filter(field => 
        calcs?.find(calc => calc.args.find(arg => {
            switch(arg.type) {
                case 'field':
                    return arg.role === field.role
            
                case 'group':
                    return arg.role === field.group?.role
                
                default: return false;
            }
        })))

    return fieldArr
}

export const getCalcFields = fields => {
    return fields.filter(field => field.calcOutput)
}
 