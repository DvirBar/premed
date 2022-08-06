export const staticDataTypes = {
    fieldTypes: {
        checkbox: {
            name: "תיבת סימון",
            value:"checkbox"
        },
        textbox: {
            name: "שדה טקסט",
            value: "textbox"
        },
        select: {
            name: "בחירה",
            value: "select"
        },
        toggle: {
            name: "מתג",
            value: "toggle"
        },
        dateSelector: {
            name: "בורר תאריכים",
            value: "dateSelector"
        }
    },
    dataTypes: {
        num: {
            name: "מספר",
            value: 'num',
            defVal: 'isPosNum'
        },
        str: {
            name: 'מחרוזת',
            value: 'str'
        },
        date: {
            name: 'תאריך',
            value: 'date',
            defVal: 'isDate'
        },
        boolVal: {
            name: 'בוליאני',
            value: 'boolVal'
        }
    },
    validationTypes: {
        isRequired: {
            name: "שדה דרוש",
            value: "isRequired",
            description: "בודק שהשדה אינו ריק"
        },
        isPosNum: {
            name: "מספר חיובי",
            value: "isPosNum",
            description: "בודק שהערך שמולא הוא גם מספר וגם חיובי"
        },
        isInt: {
            name: "מספר שלם",
            value: "isInt",
            description: "בודק שהערך שמולא הוא מספר שלם"
        },
        numRange: {
            name: "טווח מספרים",
            value: "numRange",
            description: "בודק שהערך נמצא בטווח מספרים"
        },
        isDate: {
            name: "תאריך",
            value: "isDate",
            description: "בודק שהערך הוא תאריך תקין"
        },
        isHebrew: {
            name: "עברית בלבד",
            value: "isHebrew",
            description: "בודק שהערך בעברית בלבד, ללא סימני פיסוק"
        },
        isEnglish: {
            name: "אנגלית בלבד",
            value: "isEnglish",
            description: "בודק שהערך באנגלית בלבד, ללא סימני פיסוק"
        },
        isName: {
            name: "שם",
            value: "isName",
            description: "בודק שהערך הוא שם, ללא סימני פיסוק"
        }
    }
}


export const allowedTypes = {
    types: {
        
    },
    
    isType: (keyName, validArr) => {
        const found = validArr.find(item =>
            item.value === keyName)
        
        if(found)
            return true;

        return false;
    } 
}
