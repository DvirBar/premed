const bagrutGroupArgs = [
    {
        name: 'ציון',
        role: 'grade',
        varName: 'grade',
        type: 'field',
        dataType: 'num'
    },
    {
        name: 'יחידות',
        role: 'units',
        varName: 'units',
        type: 'field',
        dataType: 'num'
    },
    {
        name: 'סוג',
        role: 'type',
        varName: 'type',
        type: 'field',
        dataType: 'str'
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


const args = {
    psycho: {
        name: 'פסיכומטרי',
        role: 'psycho',
        varName: 'psycho',
        type: 'field'
    },
    mor: {
        name: 'מו"ר',
        role: 'mor',
        varName: 'mor',
        type: 'field'
    },
/////////////////////////////////////////////////////
    bagrut: [{
        name: 'מתמטיקה',
        role: 'math',
        varName: 'math',
        type: 'group',
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
        role: 'eng',
        varName: 'eng',
        type: 'group',
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
        role: 'heb',
        varName: 'heb',
        type: 'group',
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
        role: 'arab',
        varName: 'arab',
        type: 'group',
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
        role: 'history',
        varName: 'history',
        type: 'group',
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
        role: 'bible',
        varName: 'bible',
        type: 'group',
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
        role: 'lit',
        varName: 'lit',
        type: 'group',
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
        role: 'civics',
        varName: 'civics',
        type: 'group',
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
        role: 'physics',
        varName: 'physics',
        type: 'group',
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
        role: 'bio',
        varName: 'bio',
        type: 'group',
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
        role: 'chem',
        varName: 'chem',
        type: 'group',
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
        role: 'thought',
        varName: 'thought',
        type: 'group',
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
        role: 'compSci',
        varName: 'compSci',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'ביוטכנולוגיה',
        role: 'biotech',
        varName: 'biotech',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מערכות ביוטכנולגיה',
        role: 'biotechSys',
        varName: 'biotechSys',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'בקרת מכונות',
        role: 'contMach',
        varName: 'contMach',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'אלקטרוניקה ומחשבים',
        role: 'electNcomp',
        varName: 'electNcomp',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מדעי ההנדסה',
        role: 'enginSci',
        varName: 'enginSci',
        type: 'group',
        config: {
            isOptional: true,
            tech: ['tech','combBonus', 'midBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'בינה מלאכותית ומערכות מומחה',
        role: 'aiCont',
        varName: 'aiCont',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'גרפיקה ממוחשבת',
        role: 'graphics',
        varName: 'graphics',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תכנון ותכנות מערכות',
        role: 'planProg',
        varName: 'planProg',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תכנון יישומים מנהליים',
        role: 'admApp',
        varName: 'admApp',
        
        type: 'group',
        config: {
            isOptional: true,
            tech: ['projectBonus']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'ידיעת העם והמדינה',
        role: 'yediat',
        varName: 'yediat',
        type: 'group',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'תולדות עם ישראל',
        role: 'amIsr',
        varName: 'amIsr',
        type: 'group',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת דרוזית',
        role: 'druze',
        varName: 'druze',
        type: 'group',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת איסלאם',
        role: 'islam',
        varName: 'islam',
        type: 'group',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מורשת נוצרית',
        role: 'christ',
        varName: 'christ',
        type: 'group',
        config: {
            isOptional: true,
            tech: ['isRequired']
        },
        fields: bagrutGroupArgs
    },
    {
        name: 'מקצוע אחר',
        role: 'other',
        varName: 'other',
        config: {
            isOptional: true
        },
        type: 'group',
        fields: bagrutGroupArgs,
        multiVals: true
    }
], 
    huji: {
        bagrut: {
            name: 'בגרות - העברית',
            role: 'bagrut-huji',
            varName: 'bagrut',
            type: 'field'    
        }
    }
}

export default args;