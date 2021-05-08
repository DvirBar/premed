import { createSelector } from "reselect"

const groupsSelector = state => state.ancgroups 

export const getGroups = createSelector(
    groupsSelector,
    groups => groups.groups
)

export const getGroupsByPath = pathId => createSelector(
    getGroups,
    groups => groups.filter(group => group.paths?.includes(pathId))
)
