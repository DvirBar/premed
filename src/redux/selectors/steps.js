import { createSelector } from 'reselect';

export const stepsSelector = state => state.steps.steps

export const getStepById = stepId => createSelector(
    stepsSelector,
    steps => steps.find(step => step._id === stepId)
)

export const getStepsByParent = parentId => createSelector(
    stepsSelector,
    steps => steps.filter(step => step.parent === parentId)
)

export const getTopSteps = createSelector(
    stepsSelector,
    steps => steps.filter(step => !step.parent)
)

export const getStepChildren = parentId => createSelector (
    stepsSelector,
    steps => steps.filter(step => step.parent === parentId)
)

export const getNextSteps = prevId => createSelector(
    stepsSelector,
    steps => steps.filter(step => step.prev === prevId)
)

export const getFirstSteps = parentId => createSelector(
    getStepsByParent(parentId),
    steps => steps.filter(step => !step.prev)
)




