import getBestAverage  from '../executeCalc/getBestAverage'
import getBonus from './bonusMap';
import getBaseAvg from '../executeCalc/getBaseAvg';
import groups from '../../groups/dataGroups';
import getGroupConfig from '../../groups/getGroupConfig';
import args from '../calcArgs';
const { psycho, bagrutTech, initialTech } = args


const bagrutCof = 0.5
const psychoCof = 0.075
const intercept = - 19


export const techInitial = ({ params }) => {
    const {
        'bagrutTech': bagrut,
        'psycho': psycho,
    } = params

    const techCog = bagrutCof * bagrut + psychoCof * psycho + intercept

    return {
        value: techCog.toFixed(2)
    }
}

export const techInitialRevBagrut = ({ psycho, initial }) => {
    return (initial - intercept + psychoCof * psycho) / bagrutCof
}

export const techInitialRevPsycho = ({ bagrut, initial }) => {
    return (initial - intercept + bagrutCof * bagrut) / psychoCof
}

export const techBagrut = ({ params, values }) => {
    let hasSci = false
    let hasTech = false

    let sciCounter = 0
    
    for(let argVar in params) {
        const group = groups.find(thisGroup => 
            thisGroup._id === argVar)

        const config = getGroupConfig(values, group)
        let techGroups = config['tech']

        if(techGroups) {
            if(techGroups.includes('sci')) {
                hasSci = true
                sciCounter ++
            }
    
            if(techGroups.includes('tech')) {
                hasTech = true
            }
        }
    }

    const useCombo = 
    params['math'].units === 5 && 
    (hasSci && hasTech || 
    sciCounter >= 2) ? true : false

    const config = {
        useCombo,
        comboCount: 0
    }

    const {
        baseAvg,
        notRequired,
        addedArgs
    } = getBaseAvg(params, values, 'tech', getBonus, config)

    
    const {
        value,
        payload
    } = getBestAverage(baseAvg, notRequired, 119, 20, addedArgs)

    const result = {
        payload: {
            ...payload,
            addedArgs
        },
        value: Math.round(value * 100) / 100
    }
    return result
}

export const techInitialArgs = {
    [psycho._id]: {
        coef: psychoCof
    },
    [bagrutTech._id]: {
        coef: bagrutCof
    },
    "intercept": {
        coef: intercept
    }
} 


export const techReverse = {
    [initialTech._id]: [
        bagrutTech._id, psycho._id
    ]
}

