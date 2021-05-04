const findClosestDates = (strDiffDate, strDates) => {
    let dates = strDates.map(date => new Date(date))
    let diffDate = new Date(strDiffDate)
    let laterDates = []
    let earlierDates = []

    for(let date of dates) {
        if(diffDate < date) {
            laterDates.push(date)
        }

        else {
            earlierDates.push(date)
        }
    }

    laterDates.sort((a, b) => {
        return a - b
    })

    earlierDates.sort((a, b) => {
        return b - a
    })

    return {
        later: laterDates[0],
        earlier: earlierDates[0]
    }
}

export default findClosestDates