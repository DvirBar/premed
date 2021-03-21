

export const config = {
    fields: {
        // Authenticatiion
        email: {
            isRequired: { message: 'דרוש דואר אלקטרוני' },
            isNotEmail: { message: 'כתובת דוא"ל לא תקינה' } 
        },
        
        password: {
            isRequired: { message: 'דרושה סיסמה' },
            // isNotStrongPass: { message: 'הסיסמה חלשה מדי' }
        },

        firstName: {
            isRequired: { message: 'דרוש שם פרטי' },
            isNotHebName: { message: 'שם לא תקין'}
        },

        lastName: {
            isRequired: { message: 'דרוש שם משפחה' },
            isNotHebName: { message: 'שם משפחה לא תקין'}
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
        }
    }
}
