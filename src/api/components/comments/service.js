import { checkOwnedResource } from '../../../services/validation'
import { removeFromArray } from '../../../utils/arrays'
import Comment from './db/model'

export function getByItem(itemId) {
    return Comment.getByItem(itemId)
}

export function create(comment, userId) {
        const commentObject = {
            ...comment,
            user: userId
        }

        const newComment = new Comment(commentObject)

        return newComment.save()
    }

export async function edit(id, commentDetails, user) {
        const {
            text
        } = commentDetails 
        
        const comment = await Comment.getByIdOrFail(id)
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

        comment.text = text

        return comment.save()
}

export async function toggleLike(id, userId) {
    const comment = await Comment.getByIdOrFail(id)

    let likes = comment.likes;
    if(likes.includes(userId)) {
        // likes = removeFromArray(likes, userId)
        comment.likes = removeFromArray(likes, userId)

    }

    else {
        likes.push(userId)
    }

    await comment.save()

    return comment.likes
}
    
export async function remove(id, user) {
    const comment = await Comment.getByIdOrFail(id)
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

    return comment.remove()
}
