import * as CommentService from "./service";
import { sendHttpMessage } from '../../../services/messages'
import messages from "./messages";

const { SuccessDelete } = messages

export async function getByItem(req, res, next) {
    try {
        const { itemId } = req.params
        const  comments = await CommentService.getByItem(itemId)

        return res.status(200).send(comments)
    } 
    catch(err) {
        next(err)
    }
}

export async function create(req, res, next) {
    try {  
        const userId = res.locals.user._id
        const comment = await CommentService.create(req.body, userId)

        return res.status(201).send(comment)
    }

    catch(err) {
        next(err)
    }
}

export async function edit(req, res, next) {
    try {
        const { id } = req.params
        const user = res.locals.user
        const comment = await CommentService.edit(id, req.body, user)

        return res.status(201).send(comment)
    }

    catch(err) {
        next(err)
    }
}

export async function toggleLike(req, res, next) {
    try {
        const { id } = req.params
        const userId = res.locals.user.id
        const likes = await CommentService.toggleLike(id, userId)
        return res.status(201).send(likes)
    }

    catch(err) {
        next(err)
    }
}

export async function remove(req, res, next) {
    try {
        const { id } = req.params
        const user = res.locals.user
        await CommentService.remove(id, user)

        return sendHttpMessage(res, SuccessDelete)
    }

    catch(err) {
        next(err)
    }
}
