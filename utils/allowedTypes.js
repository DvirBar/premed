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
        inquiryStatusTypes: [
            {
                name: 'נשלח',
                value: 'sent',
                default: true   
            },
            {
                name: 'בתהליך',
                value: 'in process'
            },
            {
                name: 'הושלם',
                value: 'completed',
                finalStage: true
            },
            {
                name: 'נדחה',
                value: 'regected',
                finalStage: true,
                requireNote: true
            }
        ],
        inquiryTypes: [
            {
                name: 'הצעה',
                value: 'suggestion'
            },
            {
                name: 'תקלה',
                value: 'bug'
            },
            {
                name: 'הצעת חומר',
                value: 'driveSuggest'
            },
            {
                name: 'מידע שגוי',
                value: 'falseInfo'
            },
            {
                name: 'שקלול שגוי',
                value: 'falseCalc'
            },
            {
                name: 'דיווח על תגובה',
                value: 'commentReport'
            }
        ]
    },
    
    isType: (keyName, validArr) => {
        const found = validArr.find(item =>
            item.value === keyName)
        
        if(found)
            return true;

        return false;
    } 
}
