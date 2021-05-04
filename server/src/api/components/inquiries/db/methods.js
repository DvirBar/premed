export function getUserInquiries(userId) {
    return this.find({ user: userId })
            .select('-status.admin')
}

export async function findStatusByIdOrFail(inquiryId, statusId) {
    const inquiry = this.findByIdOrFail(inquiryId)

    const status = inquiry.statuses.id(statusId)

    if(!status) {
        throw 'Could not find requested status'
    }

    return {inquiry, status}
}
 
