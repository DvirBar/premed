import React from 'react';
import moment, { months } from 'moment'
import ThreshItem from './ThreshItem';
import { groupAxis } from './groupAxis';
import ThreshGroup from './ThreshGroup';
import MonthDaysList from './MonthDaysList';

function AxisMonthSection({ 
    month, 
    year,
    threshes, 
    isEven, 
    type, 
    length,
    baseAloc,
    axisWidth }) {

    const color = type === 'accept'
    ?   '#1b922f' : '#c01b1b'

    const borderColor = isEven 
    ?   color + '70' : color

    const monthAxisWidth = axisWidth / length
    const groupsNum = baseAloc/length
    const days = new Date(year, month + 1, 0).getDate()
    const daysGap = days / groupsNum
    const groupWidth = monthAxisWidth/groupsNum

    const threshGroups = groupAxis(threshes, daysGap)
    
    const axisStyle = {
        color,
        width: monthAxisWidth
    } 

    const axisBarStyle = {
        borderColor: borderColor
    } 
    return (
        <div
        style={axisStyle}
        className="axis-month-section">
            <div
            style={axisBarStyle}
            className="axis-groups-container">
                {threshGroups.map(group => 
                    <ThreshGroup
                    key={group.index}
                    threshGroup={group}
                    groupsNum={groupsNum}
                    width={groupWidth}
                    color={color} />    
                )}
            </div>
            <MonthDaysList
            groupsNum={groupsNum}
            daysGap={daysGap}
            days={days}
            listWidth={monthAxisWidth}
            width={groupWidth}
            color={color} />
            <div className="axis-month-name">
                {moment().month(month).format('MMMM')}
            </div>
        </div>
    )
}

export default AxisMonthSection
