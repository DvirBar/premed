import { subTypes } from "./enums"

export function getAll() {
    return this.find()
}
export function getUserSub(subs, userId) {
    return subs.find(sub => 
        sub.user.equals(userId))
}

export async function getAllGroupSubs(groupId) {
    const group = await this
                    .findById(groupId)
                    .populate('subscribers.user')
                    .select('email')
    return group.subscribers
}

export async function addSub(group, userId) {
    const subObj = {
        user: userId,
        types: [subTypes.email]
    }
    
    group.subscribers.push(subObj)

    await group.save()
    return {
        group: group._id,
        types: subObj.types
    }
}
