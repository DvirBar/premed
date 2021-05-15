const { createSelector } = require("reselect")

const authSelector = state => state.auth

export const selectUsers = createSelector(
    authSelector,
    auth => auth.users.users
)

export const selectUsersFinished = createSelector(
    authSelector,
    auth => auth.users.finished
)

export const selectUserCount = createSelector(
    authSelector,
    auth => auth.users.count
)

