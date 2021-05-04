import { standardizations , standardize } from "./standardization"


export const hujiFinalCalc = (mor, cog, year) => {
    const morStd = standardizations.mor[year]

    const M = standardize(mor, morStd)
    return 0.75 * M + 0.25 * cog
}

export const hujiFinalCalcRevMor = (cog, final) => {
    return ((final/0.75) - (1/3)*cog - 21.0837) / 0.0247
}