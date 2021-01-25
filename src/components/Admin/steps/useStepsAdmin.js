import React, { useState } from 'react'

function useStepsAdmin() {
    const [selStep, setSelStep] = useState({});

    // Select step 
    const selectStep = (step, event) => {
        if(event)
            event.stopPropagation()
    
        setSelStep(step)
    }
    
    return {
        selStep,
        selectStep,
        isStepsAdmin: true,
    }
}

export default useStepsAdmin
