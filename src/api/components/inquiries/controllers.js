import { 
    statusTypes, 
    inquiryTypes 
} from './allowedTypes'

import InquiryServices from './services'
import { sendHttpMessage } from '../../../services/messages'
import messages from './messages'

const { SuccessDelete } = messages

class InquiryControllers {
    // Get all types
    static async getTypes(req, res, next) {
        return res.send({
            statusTypes,
            inquiryTypes
        })
    }

    // Get all inquiries
    static async getAll(req, res, next) {
        try {
            const inquiries = await InquiryServices.getAll()

            return res.send(inquiries)
        }

        catch(err) {
            next(err)
        }
    }

    // Get inquiries that belong to a user
    static async getUserInquiries(req, res, next) {
        const userId = res.locals.user.id
        
        try {
            const inquiries = await InquiryServices
                .getUserInquiries(userId)

            return res.send(inquiries)
        }
        catch(err) {
            next(err)
        }
    }

    // Insert new inquiry
    static async create(req, res, next) {
        const userId = res.locals.user.id

        try {
            const inquiry = await InquiryServices
                .create(req.body, userId)

            return res.send(inquiry)
        }
        catch(err) {
            next(err)
        }
    }

    // Edit existing inquiry
    static async edit(req, res, next) {
        const inquiryId = req.params.id
        const {
            id: userId,
            isAdmin
        } = res.locals.user

        const { text } = req.body

        try {
            const inquiry = await InquiryServices
                .edit(inquiryId, userId, isAdmin, text)

            res.send(inquiry)
        }
        catch(err) {
            next(err)
        }
    }

    // Assign admin to be in charge of an inquiry
    static async assignAdmin(req, res, next) {
        const inquiryId = req.params.id
        const { adminId } = req.body

        try {
            const inquiry = await InquiryServices
                .assignAdmin(inquiryId, adminId)

            return res.send(inquiry.assignedAdmin)
        }
        catch(err) {
            next(err)
        }
    }

    // Change inquiry current active status
    static async changeStatus(req, res, next) {
        const inquiryId = req.params.id
        const userId = res.locals.user.id

        try {
            const newStatus = await InquiryServices
                .changeStatus(inquiryId, userId, req.body)

            res.send(newStatus)
        }

        catch(err) {
            next(err)
        }
    }

    static async editStatusNote(req, res, next) {
        const {
            inquiryId,
            statusId
        } = req.params

        const userId = res.locals.user.id
        
        try {
            const status = await InquiryServices
                .editStatusNote(inquiryId, statusId, userId, req.body)
            
            res.send(status)    
        }
        catch(err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        const inquiryId = req.params.id
        const {
            id: userId,
            isAdmin
        } = res.locals.user

        try {
            await InquiryServices
                .delete(inquiryId, userId, isAdmin)

            sendHttpMessage(SuccessDelete)
        }
        catch(err) {
            next(err)
        }
    }
}

export default InquiryControllers