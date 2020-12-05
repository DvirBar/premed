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
                const config = group.config?.uniqueGroupType
                ?   group.config[selType]
                :   group.config
                

                /* Get group config according to group type 
                    if provided, and check if arg is optional */
                const isOptional = config.isOptional
                const replaceable = config.replaceable
                
                
                // Object for the group's nested arguments
                let groupArgs = {} 

                // Find all values that belong to the group
                const groupVals = values.filter(val => 
                    val.group === arg._id);

                // Check that all group fields have a value
                if(!isOptional && 
                    group.fields && 
                    groupVals?.length !== group.fields.length) {
                        let skip = false
                        
                        if(replaceable) {
                            const vals = values.filter(val => 
                                val.group === replaceable)
                            
                            const repGroup = groups.find(thisGroup => 
                                thisGroup._id === replaceable)

                            if(vals.length === repGroup.fields?.length) {
                                skip = true
                            }
                                
                        }
                    
                        if(!skip) {
                            console.log(arg._id);
                            throw new Error({ 
                                status: ArgsInsuffice.status,
                                msg: ArgsInsuffice.msg
                            })
                        }   
                }
                               
                if(group.fields && 
                    groupVals?.length === group.fields.length) {
                    // Iterate all group fields
                    for(let groupVal of groupVals) {
                        /* Match value role to group field role and create a 
                        key-value pair of its argument's name and numeric value */
                        const argObj = group.fields.find(argField => 
                            argField._id === groupVal.field && 
                            group._id === groupVal.group) 

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
    try {
        return storCalc.func(params, selType);
    }

    catch(err) {
        console.log(err);
        return
    }
    
}

export default executeCalc;