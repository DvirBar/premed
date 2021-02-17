import { months } from 'moment';
import React from 'react';
import AxisMonthSection from './AxisMonthSection';

function CalcThreshAxis({ threshes, type }) {
    let monthsSplit = []

    for(let thresh of threshes) {
        const threshMonth = (new Date(thresh.date)).getMonth()
        const threshYear = (new Date(thresh.date)).getYear()
        const monthObj = monthsSplit.find(item => 
            item.month === threshMonth)
        if(monthObj) {
            monthObj.threshes.push(thresh)
        }

        else {
            monthsSplit.push({
                month: threshMonth,
                year: threshYear,
                threshes: [thresh]
            })
        }
    }

    const baseAloc = 10

    return (
        <div 
        className={`calc-thresh-axis ` + type}>
            {monthsSplit.map((month, index) => 
                <AxisMonthSection
                month={month.month}
                year={month.year}
                threshes={month.threshes}
                isEven={index % 2 === 0}
                type={type}
                length={monthsSplit.length}
                baseAloc={baseAloc} />)}
        </div>
    )
}

export default CalcThreshAxis
