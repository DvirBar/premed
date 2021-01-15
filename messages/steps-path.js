const stepMessages = {
    SuccessDelete: {
        msg: {
            en: 'Steps path was successfully deleted',
            he: 'מסלול הקבלה נמחק בהצלחה'
        },
        status: 200
    },
    StepsPathNotExist: {
        msg: {
            en: 'Steps path does not exist',
            he: 'מסלול הקבלה לא קיים'
        },
        status: 404
    }
}

module.exports = stepMessages;