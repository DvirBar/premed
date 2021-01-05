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
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        paths: ['four-year'],
        uni: 'biu',
        validators: [
            validationTypes.isPosNum,
        ]
    },
    {
        name: 'סכם סופי',
        _id: 'biuFinalFour',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        paths: ['four-year'],
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