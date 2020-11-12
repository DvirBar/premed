import React from 'react';
import moment from 'moment'
import ThreshItem from './ThreshItem';

function AxisMonthSection({ month, threshes, isEven, type, relativeSize }) {
    const axisColor = {
        borderColor: type === 'accept'
        ? isEven
            ?   '#1b922f70'
            :   '#1b922f'
        : isEven
            ?   '#c01b1b70'
            :   '#c01b1b'
    }

    const relSizeStyle = {
        width: relativeSize + '%'
    }

    return (
        <div 
        className="axis-month-section"
        style={relSizeStyle}>
            <div 
            className="month-threshes"
            style={axisColor}>
                {threshes.map(thresh => 
                    <ThreshItem
                    key={thresh._id}
                    thresh={thresh} />)}
            </div>
            <span className="month-name">
                {moment().month(month).format('MMMM')}
            </span>
        </div>
    )
}

export default AxisMonthSection
