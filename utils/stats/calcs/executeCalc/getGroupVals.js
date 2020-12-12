const getGroupVals = (group, values, arg, selType) => {
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

        return {
            [arg._id]: groupArgs
        }
    }
}

export default getGroupVals