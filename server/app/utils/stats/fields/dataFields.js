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
        name: 'מכינה',
        _id: 'prep',
        paths: ['six-year'],
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        validators: [
            validationTypes.isPosNum
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
    {
        name: 'מבחן ידע',
        _id: 'knowledge',
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        paths: ['four-year'],
        validators: [
            validationTypes.isPosNum,
            {
                ...validationTypes.numRange,
                min: '250',
                max: '350'
            }
        ]
    },
    {
        name: 'מו"ר',
        _id: 'mor',
        threshField: {
            paths: ['six-year'],
            unis: ['tech']
        },
        fractionDigits: 0,
        dataType: dataTypes.num,
        fieldType: fieldTypes.textbox,
        slaves: [
            {
                _id: 'biografic',
                percent: 0.3
            },
            {
                _id: 'meser',
                percent: 0.55
            },
            {
                _id: 'shalev',
                percent: 0.15
            }
        ],
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
        name: 'ביוגרפי',
        _id: 'biografic',
        isSlave: true,
        blockOnPaths: ['six-year'],
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
        name: 'מס"ר',
        _id: 'meser',
        isSlave: true,
        blockOnPaths: ['six-year'],
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
        name: 'של"ו',
        _id: 'shalev',
        isSlave: true,
        blockOnPaths: ['six-year'],
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
        name: 'ראוי לקידום',
        _id: 'kidum',
        dataType: dataTypes.boolVal,
        fieldType: fieldTypes.checkbox,
    },
    ...taufields,
    ...bgufields,
    ...hujifields,
    ...techfields,
    ...arielfields,
    ...biufields
]

export default fields