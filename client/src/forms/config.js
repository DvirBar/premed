

export const config = {
    fields: {
        // Authenticatiion
        email: {
            isRequired: { message: 'דרוש דואר אלקטרוני' },
            isNotEmail: { message: 'כתובת דוא"ל לא תקינה' } 
        },
        
        password: {
            isRequired: { message: 'דרושה סיסמה' }
        },

        oldPassword: {
            isRequired: { message: 'יש להזין סיסמה נוכחית' },
        },

        newPassword: {
            isRequired: { message: 'יש להזין סיסמה' },
            isTooShortPass: { message: 'על הסיסמה להיות באורך 8 תווים לפחות' },
            isNotStrongPass: { message: 'על הסיסמה לכלול אותיות גדולות וקטנות באנגלית ומספרים' },
        },

        confirmPassword: {
            isRequired: { message: 'יש לחזור על הסיסמה החדשה' },
        },

        firstName: {
            isRequired: { message: 'דרוש שם פרטי' },
            isNotHebName: { message: 'שם צריך להיות בעברית'}
        },

        lastName: {
            isRequired: { message: 'דרוש שם משפחה' },
            isNotHebName: { message: 'שם משפחה צריך להיות בעברית'}
        },

        username: {
            isRequired: { message: 'דרוש שם משתמש' },
            atLeastFour: { message: 'שם המשתמש חייב להיות באורך ארבעה תווים לפחות'},
            isNotUsername: { message: 'שם משתמש לא תקין'}
        },

        name: {
            isRequired: { message: 'יש להזין שם' },
        },

        title: {
            isRequired: { message: 'יש להזין כותרת'}
        },

        content: {
            isRequired: { message: 'יש להזין תוכן'}
        },

        path: {
            isRequired: { message: 'יש להזין מסלול' }
        },
        
        url: {
            isRequired: { message: 'יש להזין כתובת'}
        },

        link: {
            isRequired: { message: 'יש להזין קישור'}
        },

        fieldType: {
            isRequired: { message: 'יש לבחור סוג שדה' }
        },

        dataType: {
            isRequired: { message: 'יש לבחור סוג נתונים' } 
        },

        validType: {
            isRequired: { message: 'יש לבחור סוג מאמת' }
        },

        pathIds: {
            isRequiredArray: {message: 'יש לבחור לפחות מסלול אחד' }
        },

        storedCalcId: {
            isRequired: { message: 'יש לבחור שקלול' }
        },

        value: {
            isRequired: { message: 'יש להזין ערך'}
        },

        icon: {
            isRequired: { message: 'יש לבחור אייקון'}
        },

        group: {
            isRequired: { message: 'יש לבחור קבוצה'}
        },

        year: {
            isRequired: { message: 'יש לבחור שנה'}
        }
    }
}
