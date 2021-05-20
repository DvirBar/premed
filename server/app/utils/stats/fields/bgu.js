import { staticDataTypes } from '../../allowedTypes';

const {
    fieldTypes,
    dataTypes,
} = staticDataTypes


const fields = [
    {
        name: 'רביע ממוחשב',
        _id: 'compQuarterBgu',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
        paths: ['six-year'],
        uni: 'bgu',
        fieldOptions: [
            {
                name: '1',
                value: 1,
            },
            {
                name: '2',
                value: 2,
            },
            {
                name: '3',
                value: 3,
            },
            {
                name: '4',
                value: 4,
            }
        ]
    },
    {
        name: 'רביע ראיון 1',
        _id: 'firstInterQuarterBgu',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
        paths: ['six-year'],
        uni: 'bgu',
        fieldOptions: [
            {
                name: '1',
                value: 1,
            },
            {
                name: '2',
                value: 2,
            },
            {
                name: '3',
                value: 3,
            },
            {
                name: '4',
                value: 4,
            }
        ]
    },
    {
        name: 'רביע ראיון 2',
        _id: 'secondInterQuarterBgu',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
        paths: ['six-year'],
        uni: 'bgu',
        fieldOptions: [
            {
                name: '1',
                value: 1,
            },
            {
                name: '2',
                value: 2,
            },
            {
                name: '3',
                value: 3,
            },
            {
                name: '4',
                value: 4,
            }
        ]
    },
    {
        name: 'סטטוס קבלה',
        _id: 'acceptStatusBgu',
        dataType: dataTypes.str,
        fieldType: fieldTypes.select,
        paths: ['six-year'],
        uni: 'bgu',
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