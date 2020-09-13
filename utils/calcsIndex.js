import * as calcs from './storedCalcs';

const bagrutArgs = [{
    name: 'מתמטיקה',
    role: 'math',
    varName: 'math',
    type: 'group'
},
{
    name: 'אנגלית',
    role: 'eng',
    varName: 'eng',
    type: 'group'
},
{
    name: 'לשון',
    role: 'heb',
    varName: 'heb',
    type: 'group'
}]

const storedCalcs = [
        {
            id: "hujiFinal",
            name: "סכם העברית (בגרות)",
            func: calcs.hujiFinal,
            args: [
                {
                    name: 'בגרות - העברית',
                    role: 'bagrut-huji',
                    varName: 'bagrut',
                    type: 'calc'
                },
                {
                    name: 'פסיכומטרי',
                    role: 'psycho',
                    varName: 'psycho',
                    type: 'field'
                },
                {
                    name: 'מו"ר',
                    role: 'mor',
                    varName: 'mor',
                    type: 'field'
                }
            ]
        },
        {
            id: "bagrutHuji",
            name: "ממוצע בגרות העברית",
            func: calcs.hujiFinal,
            args: bagrutArgs
        }
]


export default storedCalcs;