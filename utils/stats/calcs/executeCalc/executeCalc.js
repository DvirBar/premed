const dataMessages = require('../../../../messages/user-data');
const { ArgsInsuffice } = dataMessages;
import groups from '../../groups/dataGroups';
import getGroupConfig from '../../groups/getGroupConfig';
import getGroupVals from './getGroupVals';
import getMultiVals from './getMultiVals';


const executeCalc = async(storCalc, values, customGroups) => {
    const params = {}

    for(let arg of storCalc.args) {
        /* If arg is a group, map its nested 
        arguments and create a group object */
        if(arg.type === "group") {
            const group = groups.find(group => group._id === arg._id)

            if(!group.isMultiVal && !group.multiVals) {
                try {
                    const config = getGroupConfig(values, group)
                    Object.assign(params, getGroupVals(groups, group, values, arg, config))
                }

                catch(err) {
                    throw err
                }
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
        return Promise.resolve(storCalc.func(params, values))
        .then(result => {
            return result
        })
    }

    catch(err) {
        console.log(err);
        throw err
    }
}

export default executeCalc;