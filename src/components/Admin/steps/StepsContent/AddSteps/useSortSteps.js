import React, { useEffect, useState } from 'react'

const findParents = (steps, type, parentId, stepId) => {
    let parents = steps
    
    if(type !== 'add')
        parents = steps?.filter(thisStep => 
            thisStep.parent === parentId &&
            thisStep._id !== stepId) 

    return parents?.map(parent => ({
        name: parent.name,
        value: parent._id
    }))
}

const findPrevSteps = (stepId, steps, type, parentId) => {
    let prevSteps

    /* Get steps that has the same parent, and if type is 
    not 'add', check the prevStep is not the edited step. */
    prevSteps = steps?.filter(thisStep => 
        thisStep.parent === parentId &&
        (type === 'add' ||
        thisStep.prev.step !== stepId)) 
    

    return prevSteps.map(prev => ({
        name: prev.name,
        value: prev._id
    }))
}

function useSortSteps(steps, type, parentId, stepId) {
    const [parents, setParents] = useState([])
    const [prevSteps, setPrevSteps] = useState([])

    useEffect(() => {
        if(steps.length > 0) {
            // Find parent steps
            setParents(findParents(steps, type, parentId, stepId))

            if(parentId) {
                // Find prev steps
                setPrevSteps(findPrevSteps(
                    stepId, 
                    steps, 
                    type, 
                    parentId))
            }
        }
    }, [stepId, steps, parentId])

    return {
        parents,
        prevSteps
    }
    
}

export default useSortSteps
