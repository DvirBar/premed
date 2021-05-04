import Step from './db/model'

class StepService {
    getAll() {
        return Step.getAllNoAuthor()
    }

    getByPath(pathId) {
        return Step.getStepsByPath(pathId)
    }

    create(stepDetails, userId) {
        const {
            name,
            prevId,
            parentId,
            isFinal,
            isTransition,
            pathId,
            uniIds
        } = stepDetails

        const step = {
            name,
            prev: prevId,
            uniData: [],
            parent: parentId,
            path: pathId,
            isTransition,
            author: userId
        }
    }
}

export default StepService