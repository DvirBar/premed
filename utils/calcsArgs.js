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
    }], 
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