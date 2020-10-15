const topicMessages = {
    SuccessDelete: {
        msg: {
            en: 'Topic was successfully deleted',
            he: 'הנושא נמחק בהצלחה'
        },
        status: 200
    },
    PageRequired: {
        msg: {
            en: 'Page is required',
            he: 'יש להזין עמוד'
        },
        status: 400
    },
    ItemDetailsRequired: {
        msg: {
            en: 'Name and content are required',
            he: 'שם ותוכן נדרשים'
        },
        status: 400
    },
    LinkDetailsRequired: {
        msg: {
            en: 'If you provide a link, both name and url are required',
            he: 'אם בחרתם להוסיף לינק, יש להוסיף גם שם וגם כתובת'
        },
        status: 400
    },
    TopicNotExist: {
        msg: {
            en: 'Topic does not exist',
            he: 'הנושא לא קיים'
        },
        status: 404
    },
    ItemNotExist: {
        msg: {
            en: "Item does not exist",
            he: "הפריט לא קיים"
        },
        status: 404
    }
}

module.exports = topicMessages;