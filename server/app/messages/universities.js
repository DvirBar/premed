const uniMessages = {
    UniSuccessDelete: {
        msg: {
            en: 'University was successfully deleted',
            he: 'האוניברסיטה נמחקה בהצלחה'
        },
        status: 200
    },
    PathsNotFound: {
        msg: {
            en: 'Could not find all path ids assigned',
            he: 'לא הצלחנו למצוא את כל המסלולים שיוחסו'
        },
        status: 400
    },
    UniNotExist: {
        msg: {
            en: 'University does not exist',
            he: 'האוניברסיטה לא קיימת'
        },
        status: 404
    }
}

module.exports = uniMessages;