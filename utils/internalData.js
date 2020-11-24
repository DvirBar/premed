const internalData = {
    paths: [
        {
            name: 'שש-שנתי',
            _id: 'six-year'
        },
        {
            name: 'ארבע-שנתי',
            _id: 'four-year'
        }
    ],
    universities: [
        {
            name: 'העברית',
            paths: ['six-year'],
            _id: 'huji'
        },
        {
            name: 'תל-אביב',
            paths: ['six-year', 'four-year'],
            _id: 'tau'
        },
        {
            name: 'טכניון',
            paths: ['six-year'],
            _id: 'tech'
        },
        {
            name: 'בן גוריון',
            paths: ['six-year'],
            _id: 'bgu'
        },
        {
            name: 'בר אילן',
            paths: ['four-year'],
            _id: 'biu'
        },
        {
            name: 'אריאל',
            paths: ['four-year'],
            _id: 'ariel'
        }
    ]
}

export default internalData