export const isSingleMatch = (uniData, selUnis) => {
    let counter = 0
    let singleUni
    
    for(let uniItem of uniData) {
        if(selUnis.find(selUni => 
            selUni === uniItem.uni)) {
            counter ++;
            singleUni = uniItem.uni
        }
    }

    if(counter === 1) {
        return singleUni
    }

    return false
}