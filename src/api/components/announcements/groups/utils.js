export const groupWithoutSubscribers = group => {
    const groupObj = group.toObject()

    if(group.subscribers) {
        const {
            subscribers,
            ...newGroup
        } = groupObj
        
        return newGroup
    }

    return group
}