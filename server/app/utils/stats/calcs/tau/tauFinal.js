import { tauFinal as std} from './standardization'

const {
    bagrut: bagrutYears,
    psycho: psychoYears,
    mor: morYears,
    intercept: interceptYears       
} = std

function getStd(year) {
    return {
        bagCof: bagrutYears[year],
        psyCof: psychoYears[year],
        morCof: morYears[year],
        intercept: interceptYears[year]
    }
}

export function tauFinalCalc({ bagrut, psycho, mor, year }) {
    const {
        bagCof,
        psyCof,
        morCof,
        intercept
    } = getStd(year)

    return bagCof * Number(bagrut) + 
           psyCof * Number(psycho) + 
           morCof * Number(mor) + intercept
}

export function tauFinalCalcRevBagrut({ final, psycho, mor, year }) {
    const {
        bagCof,
        pysCof,
        morCof,
        intercept
    } = getStd(year)

    return (final - intercept - pysCof * psycho - morCof * mor) / bagCof
}

export function tauFinalCalcRevPsycho({ final, bagrut, mor, year }) {
    const {
        bagCof,
        pysCof,
        morCof,
        intercept
    } = getStd(year)

    return (final - intercept - bagCof * bagrut - morCof * mor) / pysCof
}

export function tauFinalCalcRevMor({ final, bagrut, psycho, year }) {
    const {
        bagCof,
        pysCof,
        morCof,
        intercept
    } = getStd(year)

    return (final - intercept - bagCof * bagrut - pysCof * psycho) / morCof
}