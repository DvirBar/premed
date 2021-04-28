const messages = {
    SuccessDelete: {
        msg: {
            en: 'User was successfully deleted',
            he: 'המשתמש נמחק בהצלחה'
        },
        status: 200
    },
    UsernameAvailable: {
        msg: {
            en: 'Username is available',
            he: 'שם המשתמש פנוי'
        },
        type: "local",
        status: 200
    },
    UsernameAvailable: {
        msg: {
            en: 'Username is unavailable',
            he: 'שם המשתמש תפוס'
        },
        type: "local",
        status: 409
    },
    UsernameAvailable: {
        msg: {
            en: 'Username is unavailable',
            he: 'שם המשתמש תפוס'
        },
        type: "local",
        status: 409
    },
    UserAlreadyExists: {
        msg: {
            en: 'A user with this email already exists',
            he: 'קיים כבר משתמש עם כתובת מייל זו'
        },
        status: 409
    },
    UserIsBlocked: {
        msg: {
            en: 'User is blocked',
            he: 'המשתמש חסום'
        },
        status: 401
    },
    InvalidCredentials: {
        msg: {
            en: 'Email or password are incorrect',
            he: 'שם משתמש או סיסמה שגויים'
        },
        status: 401
    },
    RefreshTokenInvalid: {
        msg: {
            en: "Refresh token is invalid"
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