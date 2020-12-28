const bonusMap = {
    math: {
        '5': {
            'exam': 30,
            'project': 0
        },
        '4': 10
    },
    combBonus: {
        '5': 30,
        '4': 10
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
const getBonus = (subj, subjObj, config) => {
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

    if(type === 'exam') {
        if(config?.useCombo && bonusGroups?.includes('combBonus')) {
            return bonusMap.combBonus[units]
        }
    
        if(bonusGroups?.includes('midBonus')) {
            return bonusMap.midBonus[units]
        }

        return bonusMap.lowBonus[units]
    }
    
    else if(bonusGroups?.includes('projectBonus')) {
        return bonusMap.lowBonus[units]
    }

    return 0;
}

export default getBonus