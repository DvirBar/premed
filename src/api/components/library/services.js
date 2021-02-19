import libraryDb from './db/index'
import { downvoteUpvote } from './utils'
import { saveDoc } from '../../db/methods'

class LibraryService {
    static getAll() {
        return libraryDb.getAll()
    }

    static create(data) {
        return libraryDb.create(data)
    }

    static update(id, data) {
        return libraryDb.update(id, data)
    }

    static addItem(id, data) {
        return libraryDb.addItem(id, data)
    }

    static editItem(params, data) {
        return libraryDb.editItem(params, data)
    }

    static async toggleVote(params, userId, isUpvote) {
        const { lib, item } = await libraryDb.getItemById(params)

        downvoteUpvote(item, userId, isUpvote)

        await saveDoc(lib)

        const {
            upvotes,
            downvotes
        } = item
        
        return {
            upvotes,
            downvotes
        }
    }

    static removeItem(params) {
        return libraryDb.removeItem(params)
    }

    static delete(id) {
        return libraryDb.delete(id)
    }
}

export default LibraryService