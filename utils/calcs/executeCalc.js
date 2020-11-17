const dataMessages = require('../../messages/user-data');
const { ArgsInsuffice } = dataMessages;

const executeCalc = async(storCalc, values) => {
    const params = {}

    for(let arg of storCalc.args) {
            /* If arg is a group, map its nested 
            arguments and create a group object */
            if(arg.type === "group") {
                // Object for the group's nested arguments
                let groupArgs = {} 

                // Find all values that belong to the group
                const groupVals = values.filter(val => 
                    val.field.group?.role === arg.role)
                
                // Check that all group fields have a value
                if(groupVals.length !== arg.fields.length) {
                    throw new Error({ 
                        status: ArgsInsuffice.status,
                        msg: ArgsInsuffice.msg
                     })
                }
                
                // Iterate all group fields
                for(let value of groupVals) {
                    let valField = value.field 

                    /* Match value role to group field role and create a 
                    key-value pair of its argument's name and numeric value */
                    const argObj = arg.fields.find(argField => 
                        argField.role === valField.role) 
                    const {
                        varName,
                        dataType
                    } = argObj

                    if(dataType && dataType === 'num') {
                        groupArgs[varName] = Number(value.value)
                    }

                    else {
                        groupArgs[varName] = value.value
                    }
                }
                
                params[arg.varName] = groupArgs
        }

        else {
            const argValue = values.find(val => 
                val.field.role === arg.role)

            if(!argValue)
                throw {
                    status: ArgsInsuffice.status,
                    msg: ArgsInsuffice.msg
                }

            params[arg.varName] = argValue.value || argValue.suggestValue
        }
    }

    // Execute calculation
    return storCalc.func(params);
}

export default executeCalc;