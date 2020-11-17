import args from './calcsArgs';
import * as hujiCalcs from './huji/calcs'


const {
    psycho, mor, bagrut, huji
} = args


const storedCalcs = [
    {
        id: "hujiFinal",
        name: "סכם העברית (בגרות)",
        func: hujiCalcs.hujiFinal,
        args: [
            huji.bagrut,
            psycho,
            mor
        ]
    },
    {
        id: "bagrutHuji",
        name: "ממוצע בגרות העברית",
        func: hujiCalcs.hujiBargut,
        args: bagrut
    }
]


export default storedCalcs;