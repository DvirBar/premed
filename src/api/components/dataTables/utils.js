export const findThreshByFieldAndType = (thresholds, fieldId, type) => {
    return thresholds.filter(thresh =>
        thresh.field === fieldId && 
        thresh.threshType === type) 
}

// export const findClosestDates = (strDiffDate, strDates) => {
//     let dates = strDates.map(date => new Date(date))
//     let diffDate = new Date(strDiffDate)
//     let laterDates = []
//     let earlierDates = []

//     for(let date of dates) {
//         if(diffDate < date) {
//             laterDates.push(date)
//         }

//         else {
//             earlierDates.push(date)
//         }
//     }

//     // 
//     laterDates.sort((a, b) => {
//         return a - b
//     })

//     earlierDates.sort((a, b) => {
//         return b - a
//     })

//     return {
//         later: laterDates[0],
//         earlier: earlierDates[0]
//     }
// }


// export const validateDateValues = (closestDates, thresholds, threshType, value) => {
//     if(closestDates.later) {
//         const laterThresh = thresholds.find(thresh =>
//             new Date(thresh.date).getTime() === closestDates.later.getTime())

//         if(threshType === 'accept' && laterThresh
//         && laterThresh.value > value) {
//             throw InvalidAcceptValue
//         }

//         else if(threshType === 'reject' && laterThresh
//         && laterThresh.value < value) {
//             throw InvalidRejectValue
//         } 
//     }

//     if(closestDates.earlier) {
//         const earlierThresh = thresholds.find(thresh =>
//             new Date(thresh.date).getTime() === closestDates.earlier.getTime())

//         if(threshType === 'accept' && earlierThresh
//         && earlierThresh.value < value) {
//             throw InvalidAcceptValue
//         }

//         else if(threshType === 'reject' && earlierThresh
//         && earlierThresh.value > value) {
//             throw InvalidRejectValue
//         } 
//     }
// }