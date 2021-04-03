import AncGroup from './db/model'
import { groupWithoutSubscribers } from './utils'

export async function getAll() {
    const groups = await AncGroup.getAll()

    let newGroups = []

    for(let group of groups) {
        const subCount = group.subscribers?.length || 0
        
        const newGroup = groupWithoutSubscribers(group)

        newGroups.push({
            ...newGroup,
            subCount
        })
    }

    return newGroups
}

export async function getAllWithSubs(userId) {
    let groups = await AncGroup.find()   
    let newGroups = []
    for(let group of groups) {
        const subItem = AncGroup.getUserSub(group.subscribers, userId)
        const newGroup = groupWithoutSubscribers(group)

        newGroups.push({
            ...newGroup,
            subscriptions: subItem?.types 
        })
    }

    return newGroups
}

export async function getAllGroupSubs(groupId) {
    return AncGroup.getAllGroupSubs(groupId)
    // Should be changed when there will be a notification service
    
}

export function create(data) {
    const newGroup = new AncGroup(data)

    return newGroup.save()
}

export async function edit(id, data) {
    const group = await AncGroup.getByIdOrFail(id)

    group.set({
        ...group,
        ...data
    })

    return group.save() 
}

export async function toggleSubscribe(data, userId) {
    const {
        groupIds
    } = data
    
    if(Array.isArray(groupIds)) {
        let promises = []
        for(let groupId of groupIds) {
            promises.push(groupToggleSubscribe(groupId, userId))
        }


        return Promise.all(promises).then(groups => {
            let obj = {}
            for(let group of groups) {
                obj[group.group] = group.types
            }

            return obj
        })
    }   

    throw 'Bad request: groupIds is not an array'
}

export async function unsubscribeAll(userId) {
    const groups = await AncGroup.find()

    let promises = []

    for(let group of groups) {
        promises.push(removeSub(group, userId))
    }


    return Promise.all(promises)
}


async function groupToggleSubscribe(groupId, userId) {
    const group = await AncGroup.getByIdOrFail(groupId)
    const sub = AncGroup.getUserSub(group.subscribers, userId)
    
    if(sub) {
        await sub.remove()
        await group.save()
        return {
            group: groupId,
            types: []
        }
    }
    
    else {
        return AncGroup.addSub(group, userId)
    }
}

async function removeSub(group, userId) {
    const sub = AncGroup.getUserSub(group.subscribers, userId)

    if(sub) {
        await sub.remove()
        return group.save()
    }
}

export async function remove(id) {
    const group = await AncGroup.getByIdOrFail(id)

    return group.remove()
}
