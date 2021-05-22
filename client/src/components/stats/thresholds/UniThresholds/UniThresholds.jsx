import React from 'react'
import CalcThresholds from '../CalcThresholds/CalcThresholds'

function UniThresholds({ uni }) {
    const style = {
        color: uni.color
    }
    
    return (
        <div 
        className="thresholds__uni">
            <div 
            style={style}
            className="thresholds__uni__name">
                {uni.name}
            </div>
            <CalcThresholds 
            uniId={uni._id}
            uniColor={uni.color} />
        </div>
    )
}

export default UniThresholds
