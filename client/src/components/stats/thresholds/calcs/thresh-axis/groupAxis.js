import { isObjEmpty } from "../../../../../utils/objects"

export const groupAxis = (threshes, groupNum) => {
    let groupThreshes = []
    let currentGroup = {}

    for(let thresh of threshes) {
        const day = new Date(thresh.date).getDate()

        if(!isObjEmpty(currentGroup)) {
            if((day/groupNum) <= currentGroup.index) {
                currentGroup.threshes.push(thresh)
            }

            else {
                groupThreshes.push(Object.assign({}, currentGroup))
                currentGroup = {}
                currentGroup.index = Math.ceil(day/groupNum)
                currentGroup.threshes = [thresh]
            }
        }
        
        else {
            currentGroup.index = Math.ceil(day/groupNum)
            currentGroup.threshes = [thresh]
        }
    }

    if(!isObjEmpty(currentGroup)) {
        groupThreshes.push(Object.assign({}, currentGroup))
    }

    return groupThreshes
}