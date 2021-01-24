export const getNextSteps = (steps, prevId) => {
    const nextSteps = steps.filter(step => 
        step.prev.step === prevId)

    if(nextSteps.length === 0)
        return {}

    const levelObj = {
        steps: nextSteps,
        count: nextSteps.length
    }

    return [levelObj, ...getNextSteps(steps, )]
}