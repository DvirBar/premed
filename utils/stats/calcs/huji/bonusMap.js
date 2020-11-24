const bonusMap = {
    math: {
        '5': {
            'exam': 35,
            'project': 25
        },
        '4': 15
    },
    midBonus: {
        '5': 25,
        '4': 15
    },
    lowBonus: {
        '5': 20,
        '4': 10
    }
}

// This function decides if to grant bonus and what bonus to grant
const getBonus = (subj, subjObj) => {
    const {
        units,
        grade,
        type
    } = subjObj.values;

    const bonusGroups = subjObj.groups

    if(grade < 60 || units < 4)
        return 0;

    if(subj === 'math') {
        if(units === 5) {
            return bonusMap.math['5'][type]
        }

        return bonusMap.math['4']
    }

    if(bonusGroups?.includes('midBonus')) {
        return bonusMap.midBonus[units]
    }

    return bonusMap.lowBonus[units]
}

export default getBonus