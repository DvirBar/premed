import { sendEmail } from '../../../../services/email'
import templateMap from '../../../../services/email/templates/templateMap'
const Announcement = require('./db/model')
import * as AncGroupService from '../groups/services'
import jwt from 'jsonwebtoken'


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
export async function create(data, userId, shouldEmail) {
    const newAnc = new Announcement({
        ...data,
        user: userId
    })

    const anc = await newAnc.save()

    // Send email
    if(shouldEmail) {
        sendAncEmail(anc)
    }

    return anc
}

export async function edit(id, data, shouldEmail) {
    const anc = await Announcement.getByIdOrFail(id)
    anc.set(data)

    await anc.save()

    if(shouldEmail) {
        sendAncEmail(anc, true)
    }
    
    return anc
}

export async function remove(id) {
    const anc = await Announcement.getByIdOrFail(id)

    return anc.remove()
}

async function sendAncEmail(anc, isEdit) {
    // Find subscribers
    const subs = await AncGroupService.getAllGroupSubs(anc.group)
    let title = ''
    if(isEdit) {
        title = 'תיקון מייל: '
    }

    title += anc.title
    // Loop through subscribers asynchronously and send emails
    for(let sub of subs) {
        const userEmail = sub.user.email

        const token = jwt.sign(
            {id: sub.user.id}, 
            process.env.JWT_SECRET_EMAIL)
        
        const unsubscribe_link = 
        `${process.env.SERVER_URI}/unsubscribe?token=${token}`

        sendEmail({
            subject: title,
            bcc: userEmail
        }, templateMap.announcement, {
            anc_title: title,
            anc_body: anc.content,
            unsubscribe_link,
            isEdit: isEdit
        })
    }
}