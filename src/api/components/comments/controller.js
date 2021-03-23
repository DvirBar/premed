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
        const comment = await CommentService.create(res.body)

        return res.status(201).send(comment)
    }

    catch(err) {
        next(err)
    }
}

export async function edit(req, res, next) {
    try{

        const { id } = req.params
        const comment = await CommentService.edit(id, res.body)

        return res.status(201).send(comment)
    }

    catch(err) {
        next(err)
    }
}

export async function toggleLike(req, res, next) {
    try {
        const { id } = req.params
        const comment = await CommentService.edit(id, res.body)

        return res.status(201).send(comment)
    }

    catch(err) {
        next(err)
    }
}

export async function remove(req, res, next) {
    try {
        const { id } = req.params

        await CommentService.remove(id)

        return sendHttpMessage(res, SuccessDelete)
    }

    catch(err) {
        next(err)
    }
}
