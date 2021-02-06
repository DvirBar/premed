import { createSelector } from 'reselect';
import { orderSteps } from '../../utils/steps';

export const stepsSelector = state => state.steps.steps

export const getStepById = stepId => createSelector(
    stepsSelector,
    steps => steps.find(step => step._id === stepId)
)

export const getStepsByParent = parentId => createSelector(
    stepsSelector,
    steps => steps.filter(step => step.parent === parentId)
)

export const getStartingStep = createSelector(
    stepsSelector,
    steps => steps.find(step => 
        !step.parent && !step.prev)
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




