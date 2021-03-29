import Announcement from './db/model'

export function getLast() {
    return Announcement.get(5)
}

/* This service receives the id of the last announcement 
    that was sent. */
export async function getAncsList(data) {
    const {
        lastAncId
    } = data
    const anc = await Announcement.findById(lastAncId) 
    return Announcement.getFromDate(10, anc ? anc.date : new Date(), anc?._id)
}

// Post new announcement
export function create(data, userId) {
    const newAnc = new Announcement({
        ...data,
        user: userId
    })
    // Send email
    return newAnc.save()
}

export async function edit(id, data) {
    const anc = await Announcement.getByIdOrFail(id)
    anc.set(data)
    
    return anc.save()
}

export async function remove(id) {
    const anc = await Announcement.getByIdOrFail(id)

    return anc.remove()
}