import args from './calcArgs';
import * as hujiCalcs from './huji/calcs';
import * as tauCalcs from './tau/calcs';
import * as techCalcs from './tech/calcs';
import * as bguCalcs from './bgu/calcs';
import { staticDataTypes } from '../../allowedTypes';

const {
    validationTypes,
    fieldTypes,
    dataTypes 
} = staticDataTypes

const {
    psycho, mor, bagrut, bagrutHuji
} = args

const storedCalcs = [
    {
        _id: "hujiFinal",
        name: "סכם סופי",
        func: hujiCalcs.hujiFinal,
        args: [
            bagrutHuji,
            psycho,
            mor
        ],
        uni: 'huji',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum
        ]
    },
    {
        _id: "bagrutHuji",
        name: "ממוצע בגרות",
        func: hujiCalcs.hujiBargut,
        args: bagrut,
        uni: 'huji',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '58',
                max: '127'
            }
        ]
    }
]


export default storedCalcs.map(calc => ({
    ...calc,
    fieldType: fieldTypes.textbox,
    dataType: dataTypes.num
}));