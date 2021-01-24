import React from 'react'
import useWindowDim from '../../common/useWindowDim';
import StepTopLevel from './StepTopLevel';

function TreeContent({ topSteps }) {
    const { width } = useWindowDim()

    if(width < 350) {
        return <p className="chart-unavailable">
            גודל המסך קטן מדי, אין אפשרות להציג את התרשים.
        </p>
    }
    return (
        <div className="steps-tree">
            {topSteps.map(step => 
                <StepTopLevel
                key={step._id}
                step={step} />
            )}
        </div>
    )
}

export default TreeContent
