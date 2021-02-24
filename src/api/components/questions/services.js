import QuestionGroup from './db/model'

class QuestionServices {
    static getAll() {
        return QuestionGroup.find()
    }

    static getByPath(pathId) {
        return QuestionGroup.getQuestionGroupByPath(pathId)
    }

    static create(bodyData) {
        const {
            name,
            pathId,
            readmore
        } = bodyData

        const group = {
            name,
            path: pathId,
            readmore
        }

        return QuestionGroup.insert(group)
    }

    static async edit(groupId, bodyData) {
        const group = await QuestionGroup.getByIdOrFail(groupId)

        const {
            name,
            pathId,
            readmore
        } = bodyData

        group.name = name;
        group.path = pathId;
        group.readmore = readmore;

        return group.save()
    }

    static async addQuestion(groupId, questionDetails) {
        const group = await QuestionGroup.getByIdOrFail(groupId)
        const questions = group.questions 
        questions.push(questionDetails)

        await group.save()

        return questions[questions.length - 1]
    }

    static async editQuestion(groupId, questId, questDetails) {
        const {
            group,
            question
        } = await QuestionGroup
                    .getQuestionByIdOrFail(groupId, questId)

        question.set({
            ...question,
            ...questDetails
        })

        await group.save()

        return question
    }

    static async removeQuestion(groupId, questId) {
        const {
            group,
            question
        } = await QuestionGroup
            .getQuestionByIdOrFail(groupId, questId)

        await question.remove()
        return group.save()
    } 

    static async delete(groupId) {
        const group = await QuestionGroup.getByIdOrFail(groupId)

        return group.remove()
    }
}

export default QuestionServices