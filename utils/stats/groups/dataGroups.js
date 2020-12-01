import { bagrut, bagrutTypes } from './bagrut'

const groups = [
    {
        _id: 'bagrut',
        name: 'בגרות',
        types: bagrutTypes,
        paths: ['six-year'],
        isParent: true
    },
    ...bagrut.map(bagItem => ({
        ...bagItem,
        parent: 'bagrut',
        paths: ['six-year']
    }))
]

export default groups