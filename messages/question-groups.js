const questionGroupMessages = {
    SuccessDelete: {
        msg: {
            en: 'Question group was successfully deleted',
            he: 'הקבוצה נמחקה בהצלחה'
        },
        status: 200
    },
    QuestionNotExist: {
        msg: {
            en: 'Question does not exist',
            he: 'השאלה לא קיימת'
        },
        status: 404
    },
    QuestionGroupNotExist: {
        msg: {
            en: 'Question group does not exist',
            he: 'הקבוצה לא קיימת'
        },
        status: 404
    }
}

module.exports = questionGroupMessages;