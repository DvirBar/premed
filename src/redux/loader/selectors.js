import { createSelector } from "reselect"

const loaderSelector = state => state.loader

const selectStatus = (action, field, group) => createSelector(
    loaderSelector,
    loader => {
        const actionLoader = loader[action]
        let status 
        if(actionLoader) {
            if(group) {
                if(actionLoader[group])
                    status = actionLoader[group][field]?.status
            }
    
            else if(field) {
                status = actionLoader[field]?.status
            }
    
            else {
                status = actionLoader?.status
            }
        }
        
        return status
    }
)
 
export const isLoading = (action, field, group) => createSelector(
    selectStatus(action, field, group),
    status => status === 'LOADING'
) 

export const isSuccess = (action, field, group) => createSelector(
    selectStatus(action, field, group),
    status => status === 'SUCCESS'
) 

export const isFailure = (action, field, group) => createSelector(
    selectStatus(action, field, group),
    status => status === 'FAILURE'
) 
