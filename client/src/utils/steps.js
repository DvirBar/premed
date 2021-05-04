export const stepMatchUnis = (step, unis) => {
    return step.uniData.find(dataItem => 
        unis.includes(dataItem.uni))
}

