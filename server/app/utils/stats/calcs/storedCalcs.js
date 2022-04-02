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
    bagrutBgu, initialTau, finalTau, initialHuji, finalHuji,
    initialTech, initialBgu
} = args

const storedCalcs = [
    {
        _id: "bagrutHuji",
        name: "ממוצע בגרות",
        func: hujiCalcs.hujiBargut,
        args: bagrut,
        uni: 'huji',
        paths: ['six-year'],
        fractionDigits: 2,
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
        _id: initialHuji._id,
        name: "סכם ראשוני",
        func: hujiCalcs.hujiInitial,
        threshField: true,
        fractionDigits: 3,
        calcRecog: {
            ...hujiCalcs.hujiInitialArgs
        },
        reverseCalcs: hujiCalcs.hujiReverse[initialHuji._id],
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
        _id: finalHuji._id,
        name: "סכם קבלה",
        func: hujiCalcs.hujiFinal,
        versions: [2021, 2020, 2019],
        calcRecog: {
            ...hujiCalcs.hujiFinalArgs
        },
        reverseCalcs: hujiCalcs.hujiReverse[finalHuji._id],
        threshField: true,
        fractionDigits: 3,
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
        fractionDigits: 2,
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
        _id: initialTau._id,
        name: "סכם ראשוני",
        func: tauCalcs.tauInitial,
        threshField: true,
        fractionDigits: 2,
        versions: [2022, 2021, 2020],
        calcRecog: {
            ...tauCalcs.tauInitialArgs
        },
        reverseCalcs: tauCalcs.tauReverse[initialTau._id],
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
        _id: finalTau._id,
        name: "סכם קבלה",
        func: tauCalcs.tauFinal,
        threshField: true,
        fractionDigits: 2,
        versions: [2020, 2021],
        calcRecog: {
            ...tauCalcs.tauFinalArgs
        },
        reverseCalcs: tauCalcs.tauReverse[finalTau._id],
        args: [
            bagrutTau,
            psycho,
            mor
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
        fractionDigits: 2,
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
        _id: initialTech._id,
        name: "סכם ראשוני",
        func: techCalcs.techInitial,
        threshField: true,
        fractionDigits: 2,
        calcRecog: {
            ...techCalcs.techInitialArgs
        },
        reverseCalcs: techCalcs.techReverse[initialTech._id],
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
        fractionDigits: 2,
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
        _id: initialBgu._id,
        name: "סכם ראשוני",
        func: bguCalcs.bguInitial,
        constValue: 735,
        args: [
            bagrutBgu,
            psycho
        ],
        fractionDigits: 0,
        uni: 'bgu',
        paths: ['six-year'],
        isSuggestion: true,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: 94,
                max: 935
            }
        ]
    }
]


export default storedCalcs.map(calc => ({
    ...calc,
    fieldType: fieldTypes.textbox,
    dataType: dataTypes.num
}));