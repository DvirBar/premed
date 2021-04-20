import { staticDataTypes } from '../../allowedTypes';

const {
    fieldTypes,
    validationTypes,
    dataTypes,
} = staticDataTypes


const fields = [
    {
        name: 'סכם סופי',
        _id: 'tauFinal',
        threshField: true,
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        fractionDigits: 2,
        paths: ['six-year'],
        uni: 'tau',
        validators: [
            validationTypes.isPosNum
        ]
    },
    {
        name: 'סטטוס קבלה',
        _id: 'acceptStatusTauSix',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
        paths: ['six-year'],
        uni: 'tau',
        fieldOptions: [
            {
                name: 'קבלה',
                value: 'accept',
            },
            {
                name: 'המתנה',
                value: 'pending',
            },
            {
                name: 'דחייה',
                value: 'reject',
            }
        ]
    },
    {
        name: 'סכם ראשוני',
        _id: 'tauInitialFour',
        threshField: true,
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        paths: ['four-year'],
        uni: 'tau',
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '150',
                max: '250'
            }
        ]
    },
    {
        name: 'סכם סופי',
        _id: 'tauFinalFour',
        threshField: true,
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        paths: ['four-year'],
        uni: 'tau',
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '150',
                max: '250'
            }
        ]
    },
    {
        name: 'סטטוס קבלה',
        _id: 'acceptStatusTauFour',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
        paths: ['four-year'],
        uni: 'tau',
        fieldOptions: [
            {
                name: 'קבלה',
                value: 'accept',
            },
            {
                name: 'המתנה',
                value: 'pending',
            },
            {
                name: 'דחייה',
                value: 'reject',
            }
        ]
    }
]

export default fields