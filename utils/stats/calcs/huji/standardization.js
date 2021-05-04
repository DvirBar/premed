export const standardizations = {
    bagrut: {
        coefficient: 3.9630,
        independent: -20.0621
    },
    psycho: {
        coefficient: 0.032073,
        independent: 0.3672
    },
    mor: {
        2018: {
            coefficient: 0.0233,
            independent: 21.1358
        },
        2019: {
            coefficient: 0.0208,
            independent: 21.6316
        },
        2020: {
            coefficient: 0.0247,
            independent: 21.0837
        }
    },
    cog: {
        coefficient: 1.2235,
        independent: -4.4598
    }
} 

export const standardize = (value, std, year) => {
    const {
        coefficient,
        independent
    } = std

    return coefficient * value + independent
}

export const reverseStandardize = (value, std) => {
    const {
        coefficient,
        independent
    } = std

    return (value - independent) / coefficient
}