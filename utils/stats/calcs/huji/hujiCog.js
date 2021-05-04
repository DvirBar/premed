import { reverseStandardize, standardizations, standardize } from "./standardization";

const {
    bagrut: bagrutStd,
    psycho: psychoStd,
    cog: cogStd
} = standardizations

export const hujiCog = (bagrut, psycho) => {
    
    // Standard bagrut grade
    const B = standardize(bagrut, bagrutStd);

    // Standard psychometry grade
    const P = standardize(psycho, psychoStd);

    // Calculated cognitive grade for med school
    const ratioCog = 0.3 * B + 0.7 * P;
    const finalCog = standardize(ratioCog, cogStd);

    return finalCog
}

export const hujiCogRevBagrut = (psycho, cog) => {
    const P = standardize(psycho, psychoStd);

    const B = ((cog/0.3) - (7/3)*P + 20.0621)/3.963

    return reverseStandardize(B, bagrutStd)
}

export const hujiCogRevPsycho = (bagrut, cog) => {
    const B = standardize(bagrut, bagrutStd);

    const P = ((cog/0.7) - (3/7)*B - 0.3672)/0.032073

    return reverseStandardize(P, psychoStd)
}