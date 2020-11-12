import React from 'react';
import AxisMonthSection from './AxisMonthSection';

function CalcThreshAxis({ threshes, type }) {
    let monthsSplit = []

    for(let thresh of threshes) {
        const threshMonth = (new Date(thresh.date)).getMonth()
        const monthObj = monthsSplit.find(item => 
            item.month === threshMonth)
        if(monthObj) {
            monthObj.threshes.push(thresh)
        }

        else {
            monthsSplit.push({
                month: threshMonth,
                threshes: [thresh]
            })
        }
    }

    const relativeSize = monthThreshes => {
       return (monthThreshes.length / threshes.length) * 100
    }

    return (
        <div 
        className={`calc-thresh-axis ` + type}>
            {monthsSplit.map((month, index) => 
                <AxisMonthSection
                month={month.month}
                threshes={month.threshes}
                isEven={index % 2 === 0}
                type={type}
                relativeSize={relativeSize(month.threshes)} />)}
        </div>
    )
}

export default CalcThreshAxis
