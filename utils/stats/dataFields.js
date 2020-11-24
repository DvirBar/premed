import { staticDataTypes } from '../allowedTypes'

const {
    fieldTypes,
    dataTypes,
    validationTypes
} = staticDataTypes

export const fields = [
    {
        name: 'פסיכומטרי',
        id: 'psycho',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        validators: [
            {
                value: validationTypes.isPosNum,
            },
            {
                value: validationTypes.numRange,
                min: '200',
                max: '800'
            }
        ]
    },
    {
        name: 'מו"ר',
        id: 'mor',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        validators: [
            {
                value: validationTypes.isPosNum,
            },
            {
                value: validationTypes.numRange,
                min: '150',
                max: '250'
            }
        ]
    }
]