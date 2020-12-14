import { bagrut, bagrutTypes } from './bagrut';
import { staticDataTypes } from '../../allowedTypes'

const {
    fieldTypes,
    dataTypes
} = staticDataTypes

const groups = [
    {
        _id: 'bagrut',
        name: 'בגרות',
        fields: [
            {
                name: 'מגזר',
                _id: 'sector',
                dataType: dataTypes.str,
                fieldType: fieldTypes.toggle,
                isType: true,
                fieldOptions: [
                    {
                        name: 'יהודי',
                        value: 'jew',
                    },
                    {
                        name: 'ערבי',
                        value: 'arab',
                    }
                ]
            },
        ],
        paths: ['six-year'],
        isParent: true
    },
    ...bagrut.map(bagItem => ({
        ...bagItem,
        parent: 'bagrut',
        paths: ['six-year'],
        typeId: 'sector'
    }))
]

export default groups