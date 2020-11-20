const bonusMap = {
    math: {
        '5': 35,
        '4': 20
    },
    eng: {
        '5': 25,
        '4': 15
    },
    midBonus: {
        '5': 25,
        '4': 10
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
        grade
    } = subjObj.values;

    const bonusGroups = subjObj.groups

    if(grade < 60 || units < 4)
        return 0;

    if(subj === 'math') {
        return bonusMap.math[units]
    }

    if(subj === 'eng') {
        return bonusMap.eng[units]
    }

    if(bonusGroups?.includes('midBonus')) {
        return bonusMap.midBonus[units]
    }

    return bonusMap.lowBonus[units]
}

export default getBonus