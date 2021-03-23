const messages = {
    SuccessDelete: {
        msg: {
            en: 'User was successfully deleted',
            he: 'המשתמש נמחק בהצלחה'
        },
        status: 200
    },
    InvalidCredentials: {
        msg: {
            en: 'Email or password are incorrect',
            he: 'שם משתמש או סיסמה שגויים'
        },
        status: 401
    },
    UserDoesNotExist: {
        msg: {
            en: 'User Does not exist',
            he: 'משתמש לא קיים'
        },
        status: 404
    }, 
    NotAuthorizedSelf: {
        msg: {
            en: 'Users are not authorized to delete themselves',
            he: 'משתמשים אינם רשאים למחוק את עצמם'
        },
        status: 403
    }
}

export default messages