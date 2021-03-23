import { checkOwnedResource } from '../../../services/validation'
import { removeFromArray } from '../../../utils/arrays'
import Comment from './db/model'

export function getByItem(itemId) {
        return Comment.getByItem(itemId)
    }

export function create(comment) {
        const newComment = new Comment(comment)

        return newComment.save()
    }

export async function edit(id, commentDetails, user) {
        const comment = await Comment.findByIdOrFail(id)
        const {
            id: userId,
            isAdmin 
        } = user
        
        checkOwnedResource(
            comment, 
            comment.user._id,
            userId,
            isAdmin,
            true)

        Object.assign(comment, commentDetails)

        return comment.save()
    }

export async function toggleLike(id, userId) {
    const comment = await Comment.findByIdOrFail(id)
    const likes = comment.likes

    if(likes.includes(userId)) {
        likes = removeFromArray(likes, userId)
    }

    else {
        likes.push(userId)
    }

    return comment.save()
}
    
export async function remove(id) {
    const comment = await Comment.findByIdOrFail(id)

    checkOwnedResource(
        comment, 
        comment.user._id,
        userId,
        isAdmin,
        true)

    return comment.remove()
}
