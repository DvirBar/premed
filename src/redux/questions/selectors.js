const { createSelector } = require("reselect")

const groupsSelector = state => state.questions

export const getAllGroups = createSelector(
    groupsSelector,
    questions => questions.groups
)

export const getQuestGroupById = groupId => createSelector(
    getAllGroups,
    groups => groups.find(group => group._id === groupId)
)