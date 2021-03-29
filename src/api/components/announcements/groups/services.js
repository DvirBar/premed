import AncGroup from './db/model'

export async function getAll() {
    return AncGroup.getAll()
}

export async function getAllWithSubs(userId) {
    let groups = await AncGroup.find()   
    let newGroups = []
    for(let group of groups) {
        const subItem = AncGroup.getUserSub(group.subscribers, userId)
        const groupObj = group.toObject()
        
        const {
            subscribers,
            ...newGroup
        } = groupObj

        newGroups.push({
            ...newGroup,
            subscription: subItem 
        })
    }

    return newGroups
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

export async function toggleSubscribe(groupId, userId) {
    const group = await AncGroup.getByIdOrFail(groupId)

    const sub = AncGroup.getUserSub(group.subscribers, userId)

    if(sub) {
        await sub.remove()
        await group.save()
        return undefined
    }

    return AncGroup.addSub(group, userId)
}
 
export async function remove(id) {
    const group = await AncGroup.getByIdOrFail(id)

    return group.remove()
}
