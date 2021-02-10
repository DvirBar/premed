import React, { Fragment } from 'react'
import LinkLabel from './LinkLabel'

function LinkLabels({ nextSteps, color, isMulti }) {
    const position = {
        top: isMulti ? 110 : 20
    }

    return (
        <Fragment>
            {nextSteps.map((step, index) =>
                <LinkLabel
                step={step}
                color={color}
                position={position}
                index={index}
                length={nextSteps.length }
                isMulti={isMulti} />
            )}
        </Fragment>
    )
}

export default LinkLabels
