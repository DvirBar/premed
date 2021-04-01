import * as AncServices from './services'
import messages from './messages'
const { SuccessDelete } = messages

import { sendHttpMessage } from '../../../../services/messages'

export async function getLast(req, res, next) {
    try {
        const ancs = await AncServices.getLast()

        return res.status(200).send(ancs)
    }
    catch(err) {
        next(err)
    }
}

export async function getAncsList(req, res, next) {
    try {
        const ancs = await AncServices.getAncsList(req.body)

        return res.status(200).send(ancs)
    }
    catch(err) {
        next(err)
    }
}

export async function create(req, res, next) {
    try {
        const userId = res.locals.user.id
        const anc = await AncServices.create(req.body.anc, userId, req.body.shouldEmail)
        return res.status(201).send(anc)
    }

    catch(err) {
        next(err)
    }
}

export async function edit(req, res, next) {
    try {
        const anc = await AncServices.edit(req.params.id, req.body.anc, req.body.shouldEmail)

        return res.status(200).send(anc)
    }
    catch(err) {
        next(err)
    }
}

export async function remove(req, res, next) {
    try {
        await AncServices.remove(req.params.id)

        return sendHttpMessage(res, SuccessDelete)
    }
    catch(err) {
        next(err)
    }
}