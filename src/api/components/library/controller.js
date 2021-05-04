import LibraryService from './services';
import { sendHttpMessage } from '../../../services/messages';
import messages from './messages';
import commentMessages from '../comments/messages'
 
const { DeletedSuccessfully, ItemDeletedSuccessfully } = messages

class LibraryController {
    static async getByPath(req, res, next) {
        try {
            const libraries = await LibraryService.getByPath(req.params.pathId)

            return res.send(libraries)
        }
        catch(err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const lib = await LibraryService.create(req.body)

            return res.send(lib)
        }
        catch(err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const id = req.params.id
            const data = req.body

            const lib = await LibraryService.update(id, data)

            return res.send(lib)
        }

        catch(err) {
            next(err)
        }
    }

    static async addItem(req, res, next) {
        try {
            const id = req.params.id
            const data = req.body

            const lib = await LibraryService.addItem(id, data)

            return res.send(lib)
        }

        catch(err) {
            next(err)
        }
    }

    static async editItem(req, res, next) {
        try {
            const params = req.params
            const data = req.body
            const item = await LibraryService.editItem(params, data)

            return res.send(item)
        }

        catch(err) {
            next(err)
        }
    }

    static async toggleVote(req, res, next) {
        try {
            const { id: libId, itemId } = req.params
            const userId = res.locals.user.id
            let { isUpvote } = req.query

            if(typeof isUpvote !== 'undefined') {
                if(isUpvote === 'true') {
                    isUpvote = true
                }

                else {
                    isUpvote = false
                }
            }

            else {
                throw new Error('isUpvote<bool> was not provided in query string')
            }
    
            const votes = await LibraryService.toggleVote(libId, itemId, userId, isUpvote)

            return res.send(votes)
        }

        catch(err) {
            next(err)
        }
    }

    static async removeItem(req, res, next) {
        try {
            await LibraryService.removeItem(req.params)

            return sendHttpMessage(res, ItemDeletedSuccessfully)
        }
        catch(err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            await LibraryService.delete(req.params.id)

            return sendHttpMessage(res, DeletedSuccessfully)
        }

        catch(err) {
            next(err)
        }
    }
}

export default LibraryController