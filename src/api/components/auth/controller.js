import { checkRequiredVars } from '../../../services/validation';
import UserService from './services';

import messages from './messages';
import { sendHttpMessage } from '../../../services/messages';
const { SuccessDelete, UsernameAvailable } = messages

export const rtCookieSettings = {
    name: "_rt",
    options: {
        httpOnly: true,
        path: '/api/auth/refreshToken'
    }
}

export const atCookieSettings = {
    name: "_at",
    options: {
        httpOnly: true,
    }
}


class UserController {
    static async getAllUsers(_req, res, next) {
        try {
            const users = await UserService.getAllUsers()
            return res.send(users)
        }

        catch(err) {
            next(err)
        }
    }

    static async isUsernameAvailble(req, res, next) {
        try {
            const user = await UserService.isUsernameAvailable(req.body)

            if(user) {
                return sendHttpMessage(res, UsernameAvailable)
            }
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
            const { 
                accessToken, 
                refreshToken,  
                user
            } = await UserService.create(req.body)

            res.cookie(rtCookieSettings.name, refreshToken, rtCookieSettings.options)
            res.cookie(atCookieSettings.name, accessToken, atCookieSettings.options)
            return res.send(user)
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

            const {
                accessToken,
                refreshToken,
                user
            } = await UserService.login(email, password)
            res.cookie(rtCookieSettings.name, refreshToken, rtCookieSettings.options)
            res.cookie(atCookieSettings.name, accessToken, atCookieSettings.options)

            return res.send(user)
        }
        catch(err) {
            next(err)
        }
    }

    static async refreshToken(req, res, next) {
        try {
            const refreshToken = req.cookies[rtCookieSettings.name]
            if(refreshToken) {
                const accessToken = await UserService.refreshToken(refreshToken)
                res.cookie(atCookieSettings.name, accessToken, atCookieSettings.options)
            }

            return res.send()
        }
        
        catch(err) {
            // Clear refresh token
            res.clearCookie(rtCookieSettings.name, rtCookieSettings.options)

            // Clear access token
            res.clearCookie(atCookieSettings.name, atCookieSettings.options)
            next(err)
        }
    }

    static async logout(_req, res, next) {
        try {
            // Clear refresh token
            res.clearCookie(rtCookieSettings.name, rtCookieSettings.options)

            // Clear access token
            res.clearCookie(atCookieSettings.name, atCookieSettings.options)
        
            return res.send({ msg: "Logged out successfully" })
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
