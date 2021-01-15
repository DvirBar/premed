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
    psycho, mor, bagrut, bagrutHuji, bagrutTau, bagrutTech, 
    bagrutBgu
} = args

const storedCalcs = [
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
    },
    {
        _id: "hujiInitial",
        name: "סכם ראשוני",
        func: hujiCalcs.hujiInitial,
        args: [
            bagrutHuji,
            psycho
        ],
        uni: 'huji',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '20',
                max: '28.7'
            }
        ]
    },
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
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '24',
                max: '27.61'
            }
        ]
    },
    {
        _id: "bagrutTau",
        name: "ממוצע בגרות",
        func: tauCalcs.tauBargut,
        args: bagrut,
        uni: 'tau',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '40',
                max: '117'
            }
        ]
    },
    {
        _id: "tauInitial",
        name: "סכם ראשוני",
        func: tauCalcs.tauInitial,
        args: [
            bagrutTau,
            psycho
        ],
        uni: 'tau',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum
        ]
    },
    {
        _id: "bagrutTech",
        name: "ממוצע בגרות",
        func: techCalcs.techBagrut,
        args: bagrut,
        uni: 'tech',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '60',
                max: '119'
            }
        ]
    }, 
    {
        _id: "initialTech",
        name: "סכם ראשוני",
        func: techCalcs.techInitial,
        args: [
            psycho,
            bagrutTech
        ],
        uni: 'tech',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '60',
                max: '100.5'
            }
        ]
    }, 
    {
        _id: "bagrutBgu",
        name: "ממוצע בגרות",
        func: bguCalcs.bguBargut,
        args: bagrut,
        uni: 'bgu',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '50',
                max: '130'
            }
        ]
    },
    {
        _id: "bguInitial",
        name: "סכם ראשוני",
        func: bguCalcs.bguInitial,
        args: [
            bagrutBgu,
            psycho
        ],
        uni: 'bgu',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '934',
                max: '94'
            }
        ]
    }
]


export default storedCalcs.map(calc => ({
    ...calc,
    fieldType: fieldTypes.textbox,
    dataType: dataTypes.num
}));