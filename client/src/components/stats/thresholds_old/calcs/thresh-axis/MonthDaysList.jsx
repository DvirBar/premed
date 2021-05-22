import React from 'react'
import buildDaysSections from './buildDaysSections'

function MonthDaysList({ 
    groupsNum, 
    daysGap, 
    days, 
    listWidth,
    width,
    color }) {
        
    const sections = buildDaysSections(groupsNum, daysGap, days)

    const listStyle = {
        width: listWidth    
    }

    const sectionStyle = {
        width,
        borderColor: color
    }

    return (
        <div 
        style={listStyle}
        className="month-days-list">
            {sections.map((section, index) => 
                <div 
                key={index}
                className="days-gap"
                style={sectionStyle}>
                    <div>
                        <span>{section.first} - </span>
                        <span>{section.last} </span>
                    </div>
                </div>    
            )}
        </div>  
    )
}

export default MonthDaysList
