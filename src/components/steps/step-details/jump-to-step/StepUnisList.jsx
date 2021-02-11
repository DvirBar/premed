import React, { Fragment } from 'react'
import StepUnisItem from './StepUnisItem'

function StepUnisList({ uniData }) {
    return (
        <p className="step-unis">
            {uniData.map(dataItem =>
                <StepUnisItem
                key={uniData._id}
                uniId={dataItem.uni} />
            )}
        </p>
    )
}

export default StepUnisList
