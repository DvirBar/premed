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
                isDefault: {
                    qString: 'בחר/י את מגזר תעודת הבגרות שלך'
                },
                fieldOptions: [
                    {
                        name: 'ערבי',
                        value: 'arab',
                    },
                    {
                        name: 'יהודי',
                        value: 'jew',
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