export function isAllChecked(groups) {
    for(let group of groups) {
        if(!group.subscriptions) {
            return false
        }
    }

    return true
}
