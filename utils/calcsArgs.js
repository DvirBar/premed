const bagrutGroupArgs = [
    {
        name: 'ציון',
        role: 'grade',
        varName: 'grade',
        type: 'field'
    },
    {
        name: 'יחידות',
        role: 'units',
        varName: 'units',
        type: 'field'
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
        fields: bagrutGroupArgs
    },
    {
        name: 'אנגלית',
        role: 'eng',
        varName: 'eng',
        type: 'group',
        fields: bagrutGroupArgs
    },
    {
        name: 'לשון',
        role: 'heb',
        varName: 'heb',
        type: 'group',
        fields: bagrutGroupArgs
    },
    {
        name: 'היסטוריה',
        role: 'history',
        varName: 'history',
        type: 'group',
        fields: bagrutGroupArgs  
    },
    {
        name: 'תנ"ך',
        role: 'bible',
        varName: 'bible',
        type: 'group',
        fields: bagrutGroupArgs  
    },
    {
        name: 'ספרות',
        role: 'lit',
        varName: 'lit',
        type: 'group',
        fields: bagrutGroupArgs  
    },
    {
        name: 'אזרחות',
        role: 'civics',
        varName: 'civics',
        type: 'group',
        fields: bagrutGroupArgs  
    },
    // {
    //     name: 'מקצועות נוספים',
    //     role: 'moreFields',
    //     varName: 'moreFields',
    //     isOptional: true,
    //     type: 'group',
    //     fields: bagrutGroupArgs,
    //     options: [
    //         {
    //             name: 'פיזיקה',
    //             role: 'physics',
    //             varName: 'physics',
    //         },
    //         {
    //             name: 'ביולוגיה',
    //             role: 'bio',
    //             varName: 'bio',
    //         },
    //         {
    //             name: 'כימיה',
    //             role: 'chem',
    //             varName: 'chem',
    //         },
    //         {
    //             name: 'ערבית',
    //             role: 'arab',
    //             varName: 'arab',
    //         },
    //         {
    //             name: 'מחשבת ישראל',
    //             role: 'thought',
    //             varName: 'thought',
    //         },
    //         {
    //             name: 'מקצוע אחר',
    //             role: 'other',
    //             varName: 'other',
    //         }
    //     ]
    // }
], 
    huji: {
        bagrut: {
            name: 'בגרות - העברית',
            role: 'bagrut-huji',
            varName: 'bagrut',
            type: 'calc'    
        }
    }
}

export default args;