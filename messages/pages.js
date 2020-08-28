const pageMessages = {
    SuccessDelete: {
        msg: {
            en: 'Page was successfully deleted',
            he: 'העמוד נמחק בהצלחה'
        },
        status: 200
    },
    SubpageDetailsRequired: {
        msg: {
            en: 'Name and url are required',
            he: 'שם וכתובת נדרשים'
        },
        status: 400
    },
    SubpageDetailsNotUnique: {
        msg: {
            en: 'Name and url should be unique',
            he: 'שם וכתובת צריכים להיות ייחודיים'
        },
        status: 400
    },
    LinkDetailsRequired: {
        msg: {
            en: 'Link Name and url are required',
            he: 'שם וכתובת עבור הקישור נדרשים'
        },
        status: 400
    },
    
    SubpageNotExist: {
        msg: {
            en: 'Sub-page does not exist',
            he: 'עמוד המשנה לא קיים'
        },
        status: 404
    },
    LinkNotExist: {
        msg: {
            en: 'Link does not exist',
            he: 'קישור לא קיים'
        },
        status: 404
    },
    PageNotExist: {
        msg: {
            en: 'Page does not exist',
            he: 'העמוד לא קיים'
        },
        status: 404
    }
}

module.exports = pageMessages;