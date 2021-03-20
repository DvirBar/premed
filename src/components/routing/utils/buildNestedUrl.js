export default function(nestedItems, itemKey) {
    if(Array.isArray(nestedItems) && nestedItems.length > 0) {
        let accumulateUrl = nestedItems[0]
        let paths = []
        for(let i = 1; i < nestedItems.length; i++) {
            if(!nestedItems[i]) {
                return []
            }

            accumulateUrl = `${accumulateUrl}/${nestedItems[i]}`
            paths.push({
                [itemKey]: nestedItems[i],
                url: accumulateUrl
            })
        }
    
        return paths    
    }

    return []
}