import React from 'react'

function useStepsClient() {
    const selectStep = () => {
        console.log("step selected");
    }
    
    return {
        selectStep,
        isStepsAdmin: false,
    }
}

export default useStepsClient
