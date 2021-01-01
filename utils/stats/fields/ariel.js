import { staticDataTypes } from '../../allowedTypes';

const {
    fieldTypes,
    dataTypes,
} = staticDataTypes


const fields = [
    {
        name: 'סטטוס קבלה',
        _id: 'acceptStatusAriel',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
        paths: ['four-year'],
        uni: 'ariel',
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