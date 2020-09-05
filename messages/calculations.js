const calcMessages = {
    calcSuccessDelete: {
        msg: {
            en: 'Calculation was successfully deleted',
            he: 'השקלול נמחקה בהצלחה'
        },
        status: 200
    },
    calcsNotFound: {
        msg: {
            en: 'Could not find all calc ids assigned',
            he: 'לא הצלחנו למצוא את כל השקלולים שיוחסו'
        },
        status: 400
    },
    fieldsNotFound: {
        msg: {
            en: 'Could not find all data field ids assigned',
            he: 'לא הצלחנו למצוא את כל שדות הנתונים שיוסחו'
        },
        status: 400
    },
    CalcNotExist: {
        msg: {
            en: 'Calculation does not exist',
            he: 'השקלול לא קיימת'
        },
        status: 404
    }
}

module.exports = calcMessages;