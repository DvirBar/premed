const dataMessages = require('../../../../messages/user-data');
const { ArgsInsuffice } = dataMessages;
import groups from '../../groups/dataGroups';
import getGroupVals from './getGroupVals';
import getMultiVals from './getMultiVals';


const executeCalc = async(storCalc, values, selType, customGroups) => {
    const params = {}

    for(let arg of storCalc.args) {
        /* If arg is a group, map its nested 
        arguments and create a group object */
        if(arg.type === "group") {
            const group = groups.find(group => group._id === arg._id)

            if(!group.isMultiVal && !group.multiVals) {
                Object.assign(params, getGroupVals(group, values, arg, selType))
            }
            
            else if (group.multiVals) {
                Object.assign(params, getMultiVals(group, values, customGroups))
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