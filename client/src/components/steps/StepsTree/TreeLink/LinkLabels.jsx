import React, { Fragment } from 'react'
import LinkLabel from './LinkLabel'

function LinkLabels({ nextSteps, color, isMulti, nodeX }) {
    const position = {
        top: isMulti ? 110 : 20
    }

    return (
        <Fragment>
            {nextSteps.map((step, index) =>
                step.linkLabel &&
                <LinkLabel
                key={index}
                nodeX={nodeX}
                length={nextSteps.length}
                step={step}
                color={color}
                position={position}
                index={index}
                length={nextSteps.length}
                isMulti={isMulti} />
            )}
        </Fragment>
    )
}

export default LinkLabels
