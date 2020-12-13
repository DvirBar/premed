const dataMessages = require('../../../../messages/user-data');
const { ArgsInsuffice } = dataMessages;

const getMultiVals = (parentGroup, values, customGroups) => {
    let multiVals = {}

    // Sort values by custom groups
    for(let group of customGroups) {
        const cusGroupVals = values.filter(val => 
            val.cusGroupParent === parentGroup._id
            && group._id.equals(val.group))    

        if(cusGroupVals.length === parentGroup.fields.length) {
            let valsObj = {}
            
            for(let item of cusGroupVals) {
                const argObj = parentGroup.fields.find(argField =>
                    argField._id === item.field)
    
                const { dataType } = argObj

                if(dataType && dataType.value === 'num')
                    valsObj[item.field] = Number(item.value)

                else 
                    valsObj[item.field] = item.value
            }

            multiVals[group._id] = valsObj
        }
    }

    return {
        [parentGroup._id]: {
            values: multiVals,
            multiVals: true
        }
    }
}

export default getMultiVals