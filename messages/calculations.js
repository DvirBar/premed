const calcMessages = {
    CalcSuccessDelete: {
        msg: {
            en: 'Calculation was successfully deleted',
            he: 'השקלול נמחקה בהצלחה'
        },
        status: 200
    },
    SuggestionRequired: {
        msg: {
            en: 'You need specify if calculation is suggestion',
            he: 'יש לציין אם השקלול הוא הצעה'
        },
        status: 400
    },
    FieldsNotFound: {
        msg: {
            en: 'Could not find all data field ids assigned',
            he: 'לא הצלחנו למצוא את כל שדות הנתונים שיוסחו'
        },
        status: 400
    },
    StoredCalcNotExist: {
        msg: {
            en: 'Stored calculation is not exist',
            he: 'השקלול לא קיים בשרת'
        },
        status: 404
    },
    CalcNotExist: {
        msg: {
            en: 'Calculation does not exist',
            he: 'השקלול לא קיים'
        },
        status: 404
    }
}

module.exports = calcMessages;