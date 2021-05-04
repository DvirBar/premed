export const tauInitial = ({ bagrut, psycho }) => {
    return 0.720833*psycho + 2.88108*bagrut - 130.86413
}

export const tauFinal = ({ bagrut, psycho, mor }) => {
    return 0.2163 * psycho + 0.862*bagrut + 0.3425023*mor+407.35998
}