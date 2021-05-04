import { createSelector } from 'reselect';

export const pathsSelector = state => state.paths || []

export const getPathById = pathId => createSelector(
    pathsSelector,
    paths => paths.paths.find(path => path._id === pathId)
)

export const getAllPaths = createSelector(
    pathsSelector,
    paths => paths.paths
)

