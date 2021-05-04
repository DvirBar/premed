const messages = {
    SuccessDelete: {
        msg: {
            en: 'User was successfully deleted',
            he: 'המשתמש נמחק בהצלחה'
        },
        status: 200
    },
    SuccessEdit: {
        msg: {
            en: 'User edited successfully',
            he: 'פרטי המשתמש נשמרו'
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
    PasswordChangedSuccessfully: {
        msg: {
            en: "Password changed successfully",
            he: "הסיסמה שונתה בהצלחה"
        },
        status: 200
    },
    UsernameUnavailable: {
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
    PasswordIncorrect: {
        msg: {
            en: "Password is incorrect",
            he: "הסיסמה שגויה"
        },
        status: 401
    },
    PasswordAlreadyUsed: {
        msg: {
            en: "Password already used, please choose a new one",
            he: "הסיסמה שהוזנה כבר הייתה בשימוש בעבר, יש להזין סיסמה חדשה"
        },
        status: 400
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