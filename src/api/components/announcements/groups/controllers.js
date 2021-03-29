import * as AncGroupServices from './services'
import { sendHttpMessage } from '../../../../services/messages'
import messages from './messages'
const { SuccessDelete, SuccessSubscribe, SuccessUnsubscribe } = messages

export async function getAll(req, res, next) {
    try {
        const groups = await AncGroupServices.getAll()

        return res.status(200).send(groups)
    }

    catch(err) {
        next(err)
    }
}

export async function getAllWithSubs(req, res, next) {
    try {
        const userId = res.locals.user.id
        const groups = await AncGroupServices.getAllWithSubs(userId)

        return res.status(200).send(groups)
    }

    catch(err) {
        next(err)
    }
}

export async function create(req, res, next) {
    try {
        const group = await AncGroupServices.create(req.body)

        return res.status(201).send(group)
    }

    catch(err) {
        next(err)
    }
}

export async function edit(req, res, next) {
    try {
        const group = await AncGroupServices.edit(req.params.id, req.body)

        return res.status(201).send(group)
    }

    catch(err) {
        next(err)
    }
}

export async function toggleSubscribe(req, res, next) {
    try {
        const userId = res.locals.user.id
        const sub = await AncGroupServices.toggleSubscribe(req.params.id, userId)
        const message = sub ? SuccessSubscribe : SuccessUnsubscribe

        return res.status(200).send({
            sub,
            message
        })
    }

    catch(err) {
        next(err)
    }
}

export async function remove(req, res, next) {
    try {
        await AncGroupServices.remove(req.params.id)

        return sendHttpMessage(res, SuccessDelete)
    }

    catch(err) {
        next(err)
    }
}