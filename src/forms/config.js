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
            isRequired: { message: 'יש למלא שם' },
        },

        title: {
            isRequired: { message: 'יש לבחור כותרת'}
        },

        groupId: {
            isRequired: { message: 'יש לבחור קבוצה'}
        },
        
        path: {
            isRequired: { message: 'יש לבחור מסלול' }
        }
    }
}
