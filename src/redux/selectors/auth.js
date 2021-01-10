import { createSelector } from 'reselect';

export const authSelector = state => state.auth
export const selectUser = createSelector(
    authSelector,
    auth => auth.user
)