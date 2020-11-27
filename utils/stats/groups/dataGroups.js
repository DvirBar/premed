import { bagrut, bagrutTypes } from './bagrut'

const groups = [
    {
        _id: 'bagrut',
        name: 'בגרות',
        types: bagrutTypes,
        paths: ['six-year']
    },
    ...bagrut.map(bagItem => ({
        ...bagItem,
        group: 'bagrut',
        paths: ['six-year']
    }))
]

export default groups