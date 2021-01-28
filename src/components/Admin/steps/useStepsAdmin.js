import React, { useState } from 'react'

function useStepsAdmin() {
    const [selStep, setSelStep] = useState({});
    const [displayEdit, setDisplayEdit] = useState(false)

    const toggleEdit = toggle => {
        setDisplayEdit(toggle)
    }

    // Select step 
    const selectStep = (step, event) => {
        if(event)
            event.stopPropagation()
    
        setSelStep(step)
        setDisplayEdit(true)
    }
    
    return {
        selStep,
        selectStep,
        displayEdit,
        toggleEdit,
        isStepsAdmin: true,
    }
}

export default useStepsAdmin
