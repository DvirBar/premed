import React from 'react'

function StepsEditSeciton() {
    return (
        <div>
            <EditStep
            selStep={selStep}
            steps={selPathSteps} />
            <DeleteStep stepId={selStep._id} />
        </div>
    )
}

export default StepsEditSeciton
