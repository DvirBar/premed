import QuestionServices from './services'
import { sendHttpMessage } from '../../../services/messages'
import messages from './messages'

const { SuccessDelete, QuestionSuccessDelete } = messages

class QuestionControllers {
    static async getAll(req, res, next) {
        try {
            const questionGroups = await QuestionServices.getAll()

            return res.send(questionGroups)
        }
        catch(err) {
            next(err)
        }
    }

    static async getByPath(req, res, next) {
        const pathId = req.params.pathId
        
        try {
            const questionGroups = await QuestionServices
                                        .getByPath(pathId)

            return res.send(questionGroups)
        }

        catch(err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const group = await QuestionServices.create(req.body)

            return res.send(group)
        }

        catch(err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        const groupId = req.params.id
        
        try {
            const group = await QuestionServices
                                .edit(groupId, req.body)

            return res.send(group)
        }

        catch(err) {
            next(err)
        }
    }

    static async addQuestion(req, res, next) {
        const groupId = req.params.id

        try {
            const question = await QuestionServices
                                   .addQuestion(
                                       groupId, 
                                       req.body)

            return res.send(question)
        }

        catch(err) {
            next(err)
        }
    }

    static async editQuestion(req, res, next) {
        const {
            id: groupId,
            questId
        } = req.params

        try {
            const question = await QuestionServices
                                    .editQuestion(
                                        groupId, 
                                        questId, 
                                        req.body)

            return res.send(question)
        }

        catch(err) {
            next(err)
        }
    }

    static async removeQuestion(req, res, next) {
        const {
            groupId,
            questId
        } = req.params

        try {
            await QuestionServices.removeQuestion(groupId, questId)

            return sendHttpMessage(res, QuestionSuccessDelete)
        }

        catch(err) {
            next(err)
        }
    }
    
    static async delete(req, res, next) {
        const groupId = req.params.id

        try {
            await QuestionServices.delete(groupId)

            return sendHttpMessage(res, SuccessDelete)
        }

        catch(err) {
            next(err)
        }
    }
}

export default QuestionControllers