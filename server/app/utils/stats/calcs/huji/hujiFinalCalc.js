import { hujiFinal as std } from './standardization'

const {
    bagrut: bagrutCof,
    psycho: psychoCof,
    mor: morYears,
    intercept: interceptYears
} = std 
export const hujiFinalCalc = ({bagrut, psycho, mor, year}) => {
    return bagrutCof*bagrut + psychoCof*psycho + morYears[year]*mor + interceptYears[year]
}

export const hujiFinalCalcRevMor = ({bagrut, psycho, final, year}) => {
    return (final - interceptYears[year] - bagrutCof*bagrut - psychoCof*psycho) / morYears[year]
}

export const hujiFinalCalcRevBagrut = ({psycho, mor, final, year}) => {
    return (final - interceptYears[year] - morYears[year]*mor - psychoCof*psycho) / bagrutCof
}

export const hujiFinalCalcRevPsycho = ({bagrut, mor, final, year}) => {
    return (final - interceptYears[year] - morYears[year]*mor - bagrutCof*bagrut) / psychoCof
}