import { staticDataTypes } from '../../allowedTypes'
import taufields from './tau';
import bgufields from './bgu';
import hujifields from './huji';
import techfields from './tech';
import arielfields from './ariel';
import biufields from './biu'

const {
    fieldTypes,
    dataTypes,
    validationTypes
} = staticDataTypes

const fields = [
    {
        name: 'פסיכומטרי',
        _id: 'psycho',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
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
    },
    {
        name: 'אנליטי',
        _id: 'analytic',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        paths: ['four-year'],
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '150',
                max: '250'
            }
        ]
    },
    ...taufields,
    ...bgufields,
    ...hujifields,
    ...techfields,
    ...arielfields,
    ...biufields
]

export default fields