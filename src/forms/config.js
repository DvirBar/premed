

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

        name: {
            isRequired: { message: 'יש להזין שם' },
        },

        title: {
            isRequired: { message: 'יש להזין כותרת'}
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
        }
    }
}
