const userDataMessages = {
    SuccessDelete: {
        msg: {
            en: 'Data was successfully deleted',
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
    }
}

module.exports = userDataMessages;