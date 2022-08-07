const Announcement = require('./db/model')


export function getLast() {
    return Announcement.get(5)
}

/* This service receives the id of the last announcement 
    that was sent. */
export async function getAncsList(filters) {
    const anc = await Announcement.findById(filters.lastAncId) 

    if(anc) {
        filters.maxDate = anc.date
    }

    if(!filters.maxDate) {
        filters.maxDate = new Date()
    }

    if(!filters.minDate) {
        filters.minDate = new Date(1997, 2, 7)
    }

    return Announcement.filterAncs(filters, 10)
}

// Post new announcement
export async function create(data, userId) {
    const newAnc = new Announcement({
        ...data,
        user: userId
    })

    const anc = await newAnc.save()

    return anc
}

export async function edit(id, data) {
    const anc = await Announcement.getByIdOrFail(id)
    anc.set(data)

    await anc.save()
    
    return anc
}

export async function remove(id) {
    const anc = await Announcement.getByIdOrFail(id)

    return anc.remove()
}