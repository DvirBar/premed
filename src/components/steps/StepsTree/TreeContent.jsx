import React from 'react'
import useWindowDim from '../../common/useWindowDim';
import StepsLevel from './StepsLevel';

function TreeContent({ firstStep }) {
    const { width } = useWindowDim()
    if(width < 350) {
        return <p className="chart-unavailable">
            גודל המסך קטן מדי, אין אפשרות להציג את התרשים.
        </p>
    }
    return (
        <div className="steps-tree noselect">
            <StepsLevel
            nextSteps={[firstStep]}/>
        </div>
    )
}

export default TreeContent
