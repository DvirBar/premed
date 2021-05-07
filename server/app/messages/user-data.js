const userDataMessages = {
    SuccessDelete: {
        msg: {
            en: 'Data was successfully deleted',
            he: 'הנתונים נמחקו בהצלחה'
        },
        status: 200
    },
    ValuesDeleteSuccess: {
        msg: {
            en: 'Values deleted successfully',
            he: 'הנתונים נמחקו בהצלחה'
        },
        status: 200
    },
    UserDataAlreadyExist: {
        msg: {
            en: 'User data already exists',
            he: 'הנתונים כבר קיימים'
        },
        status: 400
    },
    NoEnabledTable: {
        msg: {
            en: 'No enabled table available to assign values to',
            he: 'אין טבלה פעילה שניתן להזין אליה נתונים'
        },
        status: 400
    },
    ArgsInsuffice: {
        msg: {
            en: `Could not execute calculation because not all of its 
            required arguments were provided`,
            he: `לא ניתן לבצע את החישוב משום שלא קיימים כל המשתנים שנדרשים עבורו`
        },
        status: 400
    },
    UserDataNotInTable: {
        msg: {
            en: 'User data is not available in the requested table',
            he: 'נתוני המשתמש לא זמינים בטבלה המבוקשת'
        },
        status: 404
    },
    ReqDataNotExist: {
        msg: {
            en: 'Data requested is unavailable',
            he: 'הנתונים המבוקשים לא קיימים'
        },
        status: 404
    },
    UnauthorizedEdit: {
        msg: {
            en: 'You are not authorized to edit this data!',
            he: 'אין לך הרשאה לשנות את המידע הזה!'
        },
        status: 403
    },
    DataNotExist: {
        msg: {
            en: 'Data do not exist for this user or user does not exist',
            he: 'הנתונים לא קיימים עבור המשתמש, או שהמשתמש לא קיים'
        },
        status: 404
    },
    CustomGroupNotExist: {
        msg: {
            en: 'Custom group does not exist',
            he: 'לא נמצאה הקבוצה'
        },
        status: 404
    }
}

module.exports = userDataMessages;