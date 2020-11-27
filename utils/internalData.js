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
            _id: 'huji',
            color: '#148991'
        },
        {
            name: 'תל-אביב',
            paths: ['six-year', 'four-year'],
            _id: 'tau',
            color: '#850303'
        },
        {
            name: 'טכניון',
            paths: ['six-year'],
            _id: 'tech',
            color: '#002861'
        },
        {
            name: 'בן גוריון',
            paths: ['six-year'],
            _id: 'bgu',
            color: '#f4921d'
        },
        {
            name: 'בר אילן',
            paths: ['four-year'],
            _id: 'biu',
            color: '#004128'
        },
        {
            name: 'אריאל',
            paths: ['four-year'],
            _id: 'ariel',
            color: '#531266'
        }
    ]
}

export default internalData