import { staticDataTypes } from '../../allowedTypes'

const {
    fieldTypes,
    dataTypes,
    validationTypes
} = staticDataTypes

const bagrutGroupArgs = [
    {
        name: 'ציון',
        id: 'grade',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '40',
                max: '100'
            }
        ]
    },
    {
        name: 'יחידות',
        id: 'units',
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
        id: 'type',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
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
        name: 'יהודי',
        value: 'jew'
    },
    {
        name: 'ערבי',
        value: 'arab'
    }
]

export const bagrut = [
    {
        name: 'מתמטיקה',
        id: 'math',
        config: {
            huji: ['isRequired'],
            tech: ['isRequired'],
            tau: ['isReuired'],
            bgu: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'אנגלית',
        id: 'eng',
        config: {
            huji: ['isRequired', 'midBonus'],
            tech: ['isRequired', 'midbonus'],
            tau: ['isRequired'],
            bgu: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'עברית',
        id: 'heb',
        config: {
            uniqueBagType: true,
            jew: {
                huji: ['isRequired', 'midBonus'],
                tech: ['isRequired', 'midBonus'],
                tau: ['isRequired'],
                bgu: ['isRequired']
            },
            arab: {
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
        id: 'arab',
        config: {
            uniqueBagType: true,
            jew: {
                isOptional: true,
                huji: ['midBonus'],
                tech: ['midBonus']
            },
            arab: {
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
        id: 'history',
        config: {
            huji: ['isRequired', 'midBonus'],
            tech: ['isRequired', 'midBonus'],
            tau: ['isRequired', 'midBonus'],
            bgu: ['isRequired', 'midBonus']
        },
        fields: bagrutGroupArgs  
    },
    {
        name: 'תנ"ך',
        id: 'bible',
        config: {
            jew: {
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
        id: 'lit',
        config: {
            uniqueBagType: true,
            jew: {
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
        id: 'civics',
        config: {
            huji: ['isRequired', 'midBonus'],
            tech: ['isRequired'],
            tau: ['isRequired'],
            bgu: ['isRequired']
        },
        fields: bagrutGroupArgs  
    },
    {
        name: 'פיזיקה',
        id: 'physics',
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
        id: 'bio',
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
        id: 'chem',
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
        id: 'thought',
        config: {
            uniqueBagType: true,
            jew: {
                replaceble: 'lit',
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
        id: 'compSci',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'ביוטכנולוגיה',
        id: 'bioTech',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מערכות ביוטכנולגיה',
        id: 'biotechSys', 
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'בקרת מכונות',
        id: 'contMach',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'אלקטרוניקה ומחשבים',
        id: 'electNcomp',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מדעי ההנדסה',
        id: 'engineSci',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'בינה מלאכותית ומערכות מומחה',
        id: 'aiCont',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'גרפיקה ממוחשבת',
        id: 'graphics',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תכנון ותכנות מערכות',
        id: 'planProg', 
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תכנון יישומים מנהליים',
        id: 'admApp',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'ידיעת העם והמדינה',
        id: 'yediat',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תולדות עם ישראל',
        id: 'amIsr',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת דרוזית',
        id: 'druze',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת איסלאם',
        id: 'islam',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת נוצרית',
        id: 'christ',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מקצוע אחר',
        id: 'otherBagrut',
        config: {
            isOptional: true
        },
        fields: bagrutGroupArgs,
        multiVals: true
    }
]
