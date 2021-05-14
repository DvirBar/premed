import { createSelector } from 'reselect';
import { stepMatchUnis } from '../../utils/steps';

export const stepsSelector = state => state.steps.uniSteps

export const getStepById = stepId => createSelector(
    stepsSelector,
    steps => steps.find(step => step._id === stepId)
)

export const getStepsByParent = parentId => createSelector(
    stepsSelector,
    steps => steps.filter(step => step.parent === parentId)
)

export const getStepsByUnis = uniIds => createSelector(
    stepsSelector,
    steps => steps.filter(step =>
        stepMatchUnis(step, uniIds))
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

export const areChildrenGroups = parentId => createSelector(
    stepsSelector,
    getStepChildren(parentId),
    (steps, children) => {
        for(let child of children) {
            const posChildren = steps.filter(step => 
                step.parent === child._id)

            if(posChildren > 0) {
                return true
            }
        }

        return false
    }
)





