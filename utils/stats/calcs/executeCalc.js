const dataMessages = require('../../../messages/user-data');
const { ArgsInsuffice } = dataMessages;
import groups from '../groups/dataGroups';

const executeCalc = async(storCalc, values, selType) => {
    const params = {}

    for(let arg of storCalc.args) {

            /* If arg is a group, map its nested 
            arguments and create a group object */
            if(arg.type === "group") {
                // Check that arg is not optional
                const group = groups.find(group => group._id === arg._id)

                /* Get group config according to group type 
                    if provided, and check if arg is optional */
                const isOptional = group.config?.uniqueGroupType
                ?   group.config[selType]?.isOptional
                :   group.config?.isOptional
                
                
                // Object for the group's nested arguments
                let groupArgs = {} 

                // Find all values that belong to the group
                const groupVals = values.filter(val => 
                    val.group?._id === arg._id)
                
                // Check that all group fields have a value
                if(groupVals.length !== arg.fields.length) {
                    if(!isOptional)
                        throw new Error({ 
                            status: ArgsInsuffice.status,
                            msg: ArgsInsuffice.msg
                        })

                // Iterate all group fields
                for(let groupVal of groupVals) {

                    /* Match value role to group field role and create a 
                    key-value pair of its argument's name and numeric value */
                    const argObj = arg.fields.find(argField => 
                        argField._id === groupVal.field) 
                    const {
                        _id,
                        dataType
                    } = argObj

                    

                    if(dataType && dataType.value === 'num') {
                        groupArgs[_id] = Number(groupVal.value)
                    }

                    else {
                        groupArgs[_id] = groupVal.value
                    }
                }
                
                params[arg._id] = groupArgs
            }
        }

        else {
            const argValue = values.find(val => 
                val.field === arg._id)

            if(!argValue)
                throw {
                    status: ArgsInsuffice.status,
                    msg: ArgsInsuffice.msg
                }

            params[arg._id] = argValue.value || argValue.suggestValue
        }
    }

    // Execute calculation
    return storCalc.func(params);
}

export default executeCalc;