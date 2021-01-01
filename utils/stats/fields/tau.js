import { staticDataTypes } from '../../allowedTypes';

const {
    fieldTypes,
    dataTypes,
} = staticDataTypes


const fields = [
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