// Only start with one step
export const orderSteps = steps => {
    return getNextStep(steps)
}

const getNextStep = (steps, prevId) => {

    const nextStep = steps.find(step => 
        step.prev === prevId)

    if(!nextStep) {
        return []
    }

    return [nextStep, ...getNextStep(steps, nextStep._id)]
}

