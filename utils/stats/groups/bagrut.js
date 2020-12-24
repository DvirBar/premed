import { staticDataTypes } from '../../allowedTypes'

const {
    fieldTypes,
    dataTypes,
    validationTypes
} = staticDataTypes

const bagrutGroupArgs = [
    {
        name: 'ציון',
        _id: 'grade',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        validators: [
            validationTypes.isPosNum,
            validationTypes.isInt,
            {
                ...validationTypes.numRange,
                min: '40',
                max: '100'
            }
        ]
    },
    {
        name: 'יחידות',
        _id: 'units',
        dataType: dataTypes.num,
        fieldType: fieldTypes.select,
        fieldOptions: [
            {
                name: '1',
                value: '1',
            },
            {
                name: '2',
                value: '2',
            },
            {
                name: '3',
                value: '3',
            },
            {
                name: '4',
                value: '4',
            },
            {
                name: '5',
                value: '5',
            },
        ]
    },
    {
        name: 'סוג',
        _id: 'type',
        dataType: dataTypes.str,
        fieldType: fieldTypes.toggle,
        fieldOptions: [
            {
                name: 'מבחן',
                value: 'exam',
            },
            {
                name: 'עבודה',
                value: 'project',
            }
        ]
    }
]

export const bagrutTypes = [
    {
        name: 'ערבי',
        value: 'arab'
    },
    {
        name: 'יהודי',
        value: 'jew'
    }
]

export const bagrut = [
    {
        name: 'מתמטיקה',
        _id: 'math',
        config: {
            minUnits: 3,
            huji: ['isRequired'],
            tech: ['isRequired'],
            tau: ['isReuired'],
            bgu: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'אנגלית',
        _id: 'eng',
        config: {
            minUnits: 4,
            huji: ['isRequired', 'midBonus'],
            tech: ['isRequired', 'midbonus'],
            tau: ['isRequired'],
            bgu: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'עברית',
        _id: 'heb',
        config: {
            uniqueGroupType: true,
            jew: {
                minUnits:2,
                huji: ['isRequired', 'midBonus'],
                tech: ['isRequired', 'midBonus'],
                tau: ['isRequired'],
                bgu: ['isRequired']
            },
            arab: {
                minUnits: 2,
                huji: ['midBonus'],
                tech: ['isRequired', 'midBonus'],
                tau: ['isRequired'],
                bgu: ['isRequired', 'midBonus']
            }
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'ערבית',
        _id: 'arab',
        config: {
            uniqueGroupType: true,
            jew: {
                isOptional: true,
                huji: ['midBonus'],
                tech: ['midBonus']
            },
            arab: {
                minUnits: 3,
                huji: ['isRequired', 'midBonus'],
                tau: ['isRequired', 'midBonus'],
                tech: ['isRequired', 'midBonus'],
                bgu: ['isRequired', 'midBonus']
            }
        },
        bagType: 'jew',
        fields: bagrutGroupArgs
    },
    {
        name: 'היסטוריה',
        _id: 'history',
        config: {
            minUnits: 2,
            huji: ['isRequired', 'midBonus'],
            tech: ['isRequired', 'midBonus'],
            tau: ['isRequired', 'midBonus'],
            bgu: ['isRequired', 'midBonus']
        },
        fields: bagrutGroupArgs  
    },
    {
        name: 'תנ"ך',
        _id: 'bible',
        config: {
            uniqueGroupType: true,
            jew: {
                minUnits: 2,
                huji: ['midBonus'],
                tech: ['isRequired', 'midBonus'],
                tau: ['isRequired', 'midBonus'],
                bgu: ['isRequired', 'midBonus']
            },
            arab: {
                isOptional: true,
                huji: ['midBonus'],
                tech: ['isRequired', 'midBonus'],
                tau: ['isRequired', 'midBonus'],
                bgu: ['isRequired', 'midBonus']
            }
        },

        fields: bagrutGroupArgs  
    },
    {
        name: 'ספרות',
        _id: 'lit',
        config: {
            uniqueGroupType: true,
            jew: {
                minUnits: 2,
                replaceable: 'thought',
                huji: ['midBonus'],
                tech: ['isRequired', 'midBonus'],
                tau: ['isRequired', 'midBonus'],
                bgu: ['isRequired', 'midBonus']
            },
            arab: {
                isOptional: true,
                huji: ['midBonus'],
                tech: ['isRequired', 'midBonus'],
                tau: ['isRequired', 'midBonus'],
                bgu: ['isRequired', 'midBonus']
            }
        },
        fields: bagrutGroupArgs  
    },
    {
        name: 'אזרחות',
        _id: 'civics',
        config: {
            minUnits: 2,
            huji: ['isRequired', 'midBonus'],
            tech: ['isRequired'],
            tau: ['isRequired'],
            bgu: ['isRequired']
        },
        fields: bagrutGroupArgs  
    },
    {
        name: 'פיזיקה',
        _id: 'physics',
        config: {
            isOptional: true,
            huji: ['midBonus'],
            tech: ['sci', 'combBonus', 'midBonus','projectBonus'],
            tau: ['midBonus'],
            bgu: ['midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'ביולוגיה',
        _id: 'bio',
        config: {
            isOptional: true,
            huji: ['midBonus'],
            tech: ['sci','combBonus', 'midBonus', 'projectBonus'],
            tau: ['midBonus'],
            bgu: ['midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'כימיה',
        _id: 'chem',
        config: {
            isOptional: true,
            huji: ['midBonus'],
            tech: ['sci','combBonus', 'midBonus','projectBonus'],
            tau: ['midBonus'],
            bgu: ['midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מחשבת ישראל',
        _id: 'thought',
        config: {
            uniqueGroupType: true,
            jew: {
                minUnits: 2,
                replaceable: 'lit',
                huji: ['midBonus']
            },
            arab: {
                isOptional: true,
                huji: ['midBonus']
            }
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מדעי המחשב',
        _id: 'compSci',
        config: {
            isOptional: true,
            huji: ['midBonus'],
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'ביוטכנולוגיה',
        _id: 'bioTech',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מערכות ביוטכנולגיה',
        _id: 'biotechSys', 
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'בקרת מכונות',
        _id: 'contMach',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'אלקטרוניקה ומחשבים',
        _id: 'electNcomp',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מדעי ההנדסה',
        _id: 'engineSci',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'בינה מלאכותית ומערכות מומחה',
        _id: 'aiCont',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'גרפיקה ממוחשבת',
        _id: 'graphics',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תכנון ותכנות מערכות',
        _id: 'planProg', 
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תכנון יישומים מנהליים',
        _id: 'admApp',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'ידיעת העם והמדינה',
        _id: 'yediat',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תולדות עם ישראל',
        _id: 'amIsr',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת דרוזית',
        _id: 'druze',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת איסלאם',
        _id: 'islam',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת נוצרית',
        _id: 'christ',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מקצוע אחר',
        _id: 'otherBagrut',
        config: {
            isOptional: true
        },
        fields: bagrutGroupArgs,
        multiVals: true
    }
]
