const ancMessages = {
    SuccessDelete: {
        msg: {
            en: 'Anouncement group was successfully deleted',
            he: 'הקבוצה נמחקה בהצלחה'
        },
        status: 200
    },
    AlreadySubscribed: {
        msg: {
            en: 'You are already subscribed to this group',
            he: 'קיימת כבר הרשמה לקבוצה זו'
        },
        status: 403
    },
    AlreadyUnsubscribed: {
        msg: {
            en: 'You are not subscribed to this group',
            he: 'אינך רשום לקבוצה זו'
        },
        status: 403
    },
    NotExist: {
        msg: {
            en: 'Anouncement group does not exist',
            he: 'הקבוצה לא קיימת'
        },
        status: 404
    }
}

module.exports = ancMessages;