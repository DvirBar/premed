import { staticDataTypes } from '../../allowedTypes';

const {
    fieldTypes,
    validationTypes,
    dataTypes,
} = staticDataTypes


const fields = [
    {
        name: 'סכם ראשוני',
        _id: 'biuInitialFour',
        threshField: true,
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        paths: ['four-year'],
        fractionDigits: 2,
        uni: 'biu',
        validators: [
            validationTypes.isPosNum,
        ]
    },
    {
        name: 'סכם סופי',
        _id: 'biuFinalFour',
        threshField: true,
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        paths: ['four-year'],
        fractionDigits: 2,
        uni: 'biu',
        validators: [
            validationTypes.isPosNum,
        ]
    },
    {
        name: 'סטטוס קבלה',
        _id: 'acceptStatusBui',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
        paths: ['four-year'],
        uni: 'biu',
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