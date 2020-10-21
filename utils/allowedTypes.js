const allowedTypes = {
    types: {
        fieldTypes: [
            {
                name: "תיבת סימון",
                value:"checkbox"
            },
            {
                name: "שדה טקסט",
                value: "textbox"
            },
            {
                name: "בחירה",
                value: "select"
            }
        ],
        dataTypes: [
            {
                name: "מספר",
                value: 'num',
                defVal: 'isPosNum'
            },
            {
                name: 'מחרוזת',
                value: 'str'
            },
            {
                name: 'תאריך',
                value: 'date',
                defVal: 'isDate'
            }
        ],
        validationTypes: [
            {
                name: "שדה דרוש",
                value: "isRequired",
                description: "בודק שהשדה אינו ריק"
            },
            {
                name: "מספר חיובי",
                value: "isPosNum",
                description: "בודק שהערך שמולא הוא גם מספר וגם חיובי"
            },
            {
                name: "מספר שלם",
                value: "isInt",
                description: "בודק שהערך שמולא הוא מספר שלם"
            },
            {
                name: "טווח מספרים",
                value: "numRange",
                description: "בודק שהערך נמצא בטווח מספרים"
            },
            {
                name: "תאריך",
                value: "isDate",
                description: "בודק שהערך הוא תאריך תקין"
            },
            {
                name: "עברית בלבד",
                value: "isHebrew",
                description: "בודק שהערך בעברית בלבד, ללא סימני פיסוק"
            },
            {
                name: "אנגלית בלבד",
                value: "isEnglish",
                description: "בודק שהערך באנגלית בלבד, ללא סימני פיסוק"
            },
            {
                name: "שם",
                value: "name",
                description: "בודק שהערך הוא שם, ללא סימני פיסוק"
            }
        ],
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

module.exports = allowedTypes;