const dataTableMessages = {
    DataTableSuccessDelete: {
        msg: {
            en: 'Data table was successfully deleted',
            he: 'הטבלה נמחקה בהצלחה'
        },
        status: 200
    },
    ThresholdSuccessDelete: {
        msg: {
            en: 'Threshold was successfully removed',
            he: 'הסף נמחקה בהצלחה'
        },
        status: 200
    },
    EnabledAlreadySwitched: {
        msg: {
            en: 'User has already switched to the enabled table',
            he: 'המשתמש כבר החליף לטבלה הפעילה'
        },
        status: 400
    },
    InvalidThreshType: {
        msg: {
            en: 'Threshold type is invalid',
            he: 'סוג הסף לא תקין'
        },
        status: 400
    },
    InvalidRejectValue: {
        msg: {
            en: `Rejection threshold cannot be lower than previous 
                or greater than next`,
            he: 'סף הדחייה לא יכול להיות נמוך מהקודם לו או גבוה מהבא אחריו'
        },
        status: 400
    },
    InvalidAcceptValue: {
        msg: {
            en: 'Acception threshold cannot be greater than previous or lower than next',
            he: 'סף הקבלה לא יכול להיות גבוה מהקודם לו או נמוך מהבא אחריו'
        },
        status: 400
    },
    DataTableNotExist: {
        msg: {
            en: 'Data table does not exist',
            he: 'הטבלה לא קיימת'
        },
        status: 404
    },
    ThresholdNotExist: {
        msg: {
            en: 'Threshold does not exist',
            he: 'הסף לא קיים'
        },
        status: 404
    }
}

export default dataTableMessages;