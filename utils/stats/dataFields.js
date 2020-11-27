import { staticDataTypes } from '../allowedTypes'
import storedCalcs from './calcs/storedCalcs'

const {
    fieldTypes,
    dataTypes,
    validationTypes
} = staticDataTypes

export const fields = [
    {
        name: 'פסיכומטרי',
        _id: 'psycho',
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
        _id: 'mor',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '150',
                max: '250'
            }
        ]
    }
]