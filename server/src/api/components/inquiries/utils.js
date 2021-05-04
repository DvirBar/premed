export const deactivateActiveStatus = statuses => {
    const activeStatus = statuses.find(inquiry => 
        inquiry.active);

    activeStatus.active = false
}

export const addNewStatus = (statuses, options) => {
        deactivateActiveStatus(statuses)

        statuses.push({
            ...options,
            active: true
        })
}



