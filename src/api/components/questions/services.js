import Questions from './db/model'

class QuestionServices {
    static getAll() {
        return Questions.find()
    }

    static getByPath(pathId) {
        return Questions.getQuestionGroupByPath(pathId)
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

        return Questions.insert(group)
    }

    static async edit(groupId, bodyData) {
        const group = await Questions.getByIdOrFail(groupId)

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
        console.log(questionDetails);
        const group = await Questions.getByIdOrFail(groupId)
        const questions = group.questions 
        questions.push(questionDetails)

        await group.save()

        return questions[questions.length - 1]
    }

    static async editQuestion(groupId, questId, questDetails) {
        const {
            group,
            question
        } = await Questions
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
        } = await Questions
            .getQuestionByIdOrFail(groupId, questId)

        await question.remove()
        return group.save()
    } 

    static async delete(groupId) {
        const group = await Questions.getByIdOrFail(groupId)

        return group.remove()
    }
}

export default QuestionServices