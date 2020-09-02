const allowedTypes = {
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
            name: "מספר חיובי שלם",
            value: "isPosInt",
            description: "בודק שהערך שמולא הוא מספר, חיובי ושלם"
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
    isType: (keyName, validArr) => {
        for(let obj in validArr) {
            if(obj["value"] === keyName)
                return true;
        }
        return false;
    } 
}

module.exports = allowedTypes;