import { createSelector } from 'reselect';

export const pathsSelector = state => state.paths

export const getAllPaths = createSelector(
    pathsSelector,
    paths => paths.paths
)
