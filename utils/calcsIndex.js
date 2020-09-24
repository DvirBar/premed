import args from './calcsArgs';
import * as calcs from './storedCalcs';


const {
    psycho, mor, bagrut, huji
} = args


const storedCalcs = [
        {
            id: "hujiFinal",
            name: "סכם העברית (בגרות)",
            func: calcs.hujiFinal,
            args: [
                huji.bagrut,
                psycho,
                mor
            ]
        },
        {
            id: "bagrutHuji",
            name: "ממוצע בגרות העברית",
            func: calcs.hujiBargut,
            args: bagrut
        }
]


export default storedCalcs;