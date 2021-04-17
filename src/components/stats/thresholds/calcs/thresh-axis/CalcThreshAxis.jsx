import React from 'react';
import AxisMonthSection from './AxisMonthSection';
import PropTypes from 'prop-types';

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

    const axisWidth = 830

    const axisStyle ={
        width: axisWidth
    }
    
    return (
        <div 
        className="scroll-wrapper">
            <div 
            style={axisStyle}
            className={`calc-thresh-axis scrollbar-main` + type}>
                {monthsSplit.map((month, index) => 
                    <AxisMonthSection
                    key={index}
                    month={month.month}
                    year={month.year}
                    threshes={month.threshes}
                    isEven={index % 2 === 0}
                    type={type}
                    length={monthsSplit.length}
                    baseAloc={baseAloc} 
                    axisWidth={axisWidth} />)}
            </div>
        </div>
    )
}

CalcThreshAxis.propTypes = {
    threshes: PropTypes.array,
    type: PropTypes.string
}

export default CalcThreshAxis
