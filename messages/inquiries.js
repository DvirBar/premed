const inquiryMessages = {
    SuccessDelete: {
        msg: {
            en: 'Inquiry was successfully deleted',
            he: 'הפניה נמחקה בהצלחה'
        },
        status: 200
    },
    StatusInvalid: {
        msg: {
            en: 'Inquiry status is invalid',
            he: 'הסטטוס לא תקין'
        },
        status: 400
    },
    InquiryNotOwned: {
        msg: {
            en: 'You do not own this inquiry!',
            he: 'הפניה לא שייכת לך!'
        },
        status: 403
    },
    NotExist: {
        msg: {
            en: 'Inquiry does not exist',
            he: 'הפניה לא קיימת'
        },
        status: 404
    },
    StatusNotExist: {
        msg: {
            en: 'Status does not exist',
            he: 'הסטטוס לא קיים'
        },
        status: 404
    }
}

module.exports = inquiryMessages;