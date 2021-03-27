import { createSelector } from "reselect"

export const commentsSelector = state => state.comments

export const getAllComments = createSelector(
    commentsSelector,
    comments => comments.comments
)

export const getCommentsByParent = parentId => createSelector(
    getAllComments,
    comments => comments.filter(comment => 
        comment.parent === parentId)
)