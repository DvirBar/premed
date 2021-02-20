import { checkRequiredVars } from '../../../services/validation';
import UserService from './services';

import messages from './messages';
import { sendHttpMessage } from '../../../services/messages';
const { SuccessDelete } = messages

class UserController {
    static async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            return res.send(users)
        }

        catch(err) {
            next(err)
        }
    }

    static getUserByToken(req, res, next) {
        try {
            const user = UserService.getUserByToken(res.locals.user)
            return res.send(user)
        }
        
        catch(err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const loginInfo = await UserService.create(req.body)

            return res.send(loginInfo)
        }

        catch(err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        const {
            email,
            password
        } = req.body

        try {
            checkRequiredVars(req.body)

            const loginInfo = await UserService.login(email, password)

            return res.send(loginInfo)
        }
        catch(err) {
            next(err)
        }
    }

    static async editUser(req, res, next) {
        try {
            const editedUser = await UserService.editUser(req.body, res.locals.user.id)
            res.send(editedUser)
        }
        catch(err) {
            next(err)
        }
    }

    static async deleteUser(req, res, next) {
        const delUserId = req.params.id
        const reqUserId = res.locals.user.id
        try {
            await UserService.deleteUser(delUserId, reqUserId)

            return sendHttpMessage(res, SuccessDelete)
        }
        catch(err) {
            next(err)
        }
    }
}

export default UserController
