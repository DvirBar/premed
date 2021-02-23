import { checkOwnedResource } from '../../../services/validation';
import { inquiryTypes, statusTypes } from './allowedTypes';
import Inquiry from './db/model';
import { addNewStatus } from './utils';

class InquiryServices {
    static getAll() {
        return Inquiry.find()
    }

    static getUserInquiries(userId) {
        return Inquiry.getUserInquiries(userId)
    }

    static create(inquiryData, userId) {
        const { 
            text,
            type,
            refLink
        } = inquiryData;

        const newInquiry = {
            text,
            user: userId,
            type,
            refLink,
            statuses: [{
                active: true
            }]
        }

        return Inquiry.insert(newInquiry) 
    }

    static async edit(inquiryId, userId, isAdmin, text) {
        const inquiry = await Inquiry.getByIdOrFail(inquiryId)

        // Check that if the user is not an admin, they own it
        checkOwnedResource(inquiry, userId, isAdmin, true)

        inquiry.text = text 

        /*  If there is more than one status, reset
        *   active status to be the default one. 
        *
        *   This is done by not passing a 'type' property 
        *   in the 'options' object.       
        */ 
        const statuses = inquiry.statuses
        if(statuses.length > 1) {
            const options = {
                note: 'הפנייה נערכה'
            }

            addNewStatus(statuses, options)
        }

        return inquiry.save()
    }

    static async assignAdmin(inquiryId, adminId) {
        const inquiry = await Inquiry.getByIdOrFail(inquiryId)

        inquiry.assignedAdmin = adminId

        return inquiry.save()
    }

    static async changeStatus(inquiryId, userId, statusDetails) {
        const {
            type,
            note
        } = statusDetails
        
        if(!statusTypes[type]) {
            throw 'Invalid status'
        }

        const inquiry = await Inquiry.getByIdOrFail(inquiryId)

        const options = {
            type,
            note,
            admin: userId
        }

        const statuses = inquiry.statuses

        addNewStatus(statuses, options)

        await inquiry.save()

        return statuses[statuses.length - 1]
    }

    static async editStatusNote(inquiryId, statusId, userId, note) {
        const {
            inquiry, 
            status
        } = await Inquiry.findStatusByIdOrFail(inquiryId, statusId)
        
        status.note = note
        status.user = userId

        await inquiry.save()

        return status
    }

    static async delete(inquiryId, userId, isAdmin) {
        const inquiry = await Inquiry.getByIdOrFail(inquiryId)

        checkOwnedResource(inquiry, userId, isAdmin, true)
        
        return inquiry.remove()
    }

}

export default InquiryServices