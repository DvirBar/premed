import args from './calcArgs';
import * as hujiCalcs from './huji/calcs';
import * as tauCalcs from './tau/calcs';
import * as techCalcs from './tech/calcs';
import * as bguCalcs from './bgu/calcs';


const {
    psycho, mor, bagrut, bagrutHuji
} = args

const storedCalcs = {
    hujiFinal: {
        id: "hujiFinal",
        name: "סכם העברית (בגרות)",
        func: hujiCalcs.hujiFinal,
        args: [
            bagrutHuji,
            psycho,
            mor
        ],
        uni: 'huji',
        path: 'six-year',
        isSuggestion: true
    },
    bagrutHuji: {
        id: "bagrutHuji",
        name: "ממוצע בגרות העברית",
        func: hujiCalcs.hujiBargut,
        args: bagrut,
        uni: 'huji',
        path: 'six-year',
        isSuggestion: true
    }
}


export default storedCalcs;