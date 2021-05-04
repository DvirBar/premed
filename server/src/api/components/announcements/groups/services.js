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

export async function updateSubscriptions(subs, userId) {
    let promises = []
    for(let sub of subs) {
        promises.push(updateSub(sub.groupId, sub.sub, userId))
    }


    return Promise.all(promises).then(subItems => {
        let obj = {}
        for(let subItem of subItems) {
            obj[subItem.groupId] = subItem.sub
        }

        return obj
    })
}

export async function unsubscribeAll(userId) {
    const groups = await AncGroup.find()

    let promises = []

    for(let group of groups) {
        promises.push(removeSub(group, userId))
    }


    return Promise.all(promises)
}


async function updateSub(groupId, sub, userId) {
    const group = await AncGroup.getByIdOrFail(groupId)
    let userSub = AncGroup.getUserSub(group.subscribers, userId)
    let subToReturn 
    if(!sub && userSub) {
        await userSub.remove()
    }
    
    else if(sub && !userSub) {
        subToReturn = sub
        group.subscribers.push({
            user: userId,
            types: subToReturn
        })
    }

    else {
        subToReturn = userSub?.types
    }
    await group.save()


    return {
        groupId,
        sub: subToReturn
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
