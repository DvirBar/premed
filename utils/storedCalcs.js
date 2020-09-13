export const hujiFinal = params => {
    const {
        'bagrut': bagrut,
        'psycho': psycho,
        'mor': mor
    } = params
    
    // Standard bagrut grade
    const B = 3.9630 * bagrut - 20.0621;

    // Standard psychometry grade
    const P = 0.032073 * psycho + 0.3672;

    // Calculated cognitive grade for med school
    const X = 0.3 * B + 0.7 * P;
    const Y = 1.2235 * X - 4.4598;

    // Standard mor grade
    const M = 0.0247 * mor + 21.0837

    // Final grade
    const S = 0.75 * M + 0.25 * Y

    // Return result rounded to 3 decimals
    return S.toFixed(3);
}