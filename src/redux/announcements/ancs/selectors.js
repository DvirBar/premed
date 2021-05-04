import { createSelector } from 'reselect'

export const ancsSelector = state => state.ancs

export const getAllAncs = createSelector(
    ancsSelector,
    ancs => ancs.ancs
)