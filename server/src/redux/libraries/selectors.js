import { createSelector } from "reselect"

export const librariesSelector = state => state.libraries

export const getAllLibraries = createSelector(
    librariesSelector,
    libs => libs.libraries
)

export const getLibById = libId => createSelector(
    getAllLibraries,
    libs => libs.find(lib => lib._id === libId)
)

export const getTopLibs = createSelector(
    getAllLibraries,
    libs => libs.filter(lib => !lib.parent)
)

export const getLibChildren = parentId => createSelector(
    getAllLibraries,
    libs => libs.filter(lib => lib.parent === parentId)
)