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
            en: 'Username is available',
            he: 'שם המשתמש פנוי'
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
            en: "Password was already in use, please choose a new one",
            he: "הסיסמה שהוזנה כבר הייתה בשימוש בעבר, יש לבחור אחרת"
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
    },
    NoMatchingUserForEmail: {
        msg: { 
            he: "לא קיים משתמש התואם כתובת מייל זו",
            en: "A user matching this email address doens't exist"
        }, 
        status: 404
    },
    EmailIsRequiredForPasswordReset: {
        msg: {
            he: "דרושה כתובת מייל על מנת לאפס את הסיסמה",
            en: "Email is required to reset password"
        },
        status: 400
    },
    PasswordResetEmailSentSuccessfully: {
        msg: {
            he: "קישור לאיפוס הסיסמה נשלח בהצלחה",
            en: "A link to reset your password has been sent to your email"
        }, 
        status: 200
    },
    PasswordResetEmailNotSent: {
        msg: {
            he: "לא הצלחנו לשלוח מייל לאיפוס הסיסמה",
            en: "We couldn't send a reset password email"
        }, 
        status: 500
    }, 
    PasswordResetFailed: {
        msg: {
            he: "כשלון בשינוי סיסמה",
            en: "Password change failed"
        }, 
        status: 500
    }, 
    PasswordResetSuccessfully: {
        msg: {
            he: "הסיסמה אופסה בהצלחה",
            en: "Password reset successfuolly"
        },
        status: 200
    },
    MaxDailyResetAttemptsReached: {
        msg: {
            he: "הגעת לגבול היומי לניסיונות איפוס סיסמה",
            en: "You've reached the daily password reset attempts quota"
        },
        status: 400
    },
}

export default messages