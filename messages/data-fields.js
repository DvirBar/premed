const dataFieldMessages = {
    DataFieldSuccessDelete: {
        msg: {
            en: 'Data field was successfully deleted',
            he: 'שדה הנתונים נמחק בהצלחה'
        },
        status: 200
    },
    InvalidFieldType: {
        msg: {
            en: 'Field type is invalid',
            he: 'סוג השדה לא תקין'
        },
        status: 400
    },
    InvalidValidatorType: {
        msg: {
            en: 'Validator type is invalid',
            he: 'סוג בודק התקינות לא תקין'
        },
        status: 400
    },
    ValidatorTypeRequired: {
        msg: {
            en: 'Validator type is required',
            he: 'סוג בודק תקינות נדרש'
        },
        status: 400
    },    
    // RatioExceeds: {
    //     msg: {
    //         en: 'Ratio is invalid, should be between 0 to 100',
    //         he: 'היחס לא תקין, ערכו צריך להיות בין 0 ל-100'
    //     },
    //     status: 400
    // },
    // RatioSumExceeds: {
    //     msg: {
    //         en: 'Ratio is invalid, it causes the sum of all other ratios in group to exceed 100%',
    //         he: 'היחס לא תקין, הסכום ביחד עם שאר הערכים בקבוצה עולים על 100%'
    //     },
    //     status: 400
    // },
    ValidatorNotExist: {
        msg: {
            en: 'Validator not exist',
            he: 'בודק התקינות לא קיים'
        },
        status: 404
    },
    DataFieldNotExist: {
        msg: {
            en: 'Data field does not exist',
            he: 'שדה הנתונים לא קיימת'
        },
        status: 404
    }
}

module.exports = dataFieldMessages;