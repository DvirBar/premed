const buildDaysSections = (groupsNum, daysGap, days) => {
    let sections = []
    let index = 1
    let tempObj = {}
    let currentDay = 1

    while(currentDay < days) {
        // Add starting day
        tempObj.first = currentDay
        
        let endingDay
        if(index >= groupsNum) {
            endingDay = days
        }

        else {
            endingDay = currentDay - 1 + Math.floor(daysGap)
        }
    
        tempObj.last = endingDay
        
        // Add days range as a section
        sections.push(Object.assign({}, tempObj))

        // Reset object
        tempObj = {}

        // Set current day as the next day
        currentDay = endingDay + 1

        index ++
    }

    return sections
}

export default buildDaysSections