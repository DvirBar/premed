import { checkRequiredVars } from '../../../services/validation';
import UserService from './services';

import messages from './messages';
import { sendHttpMessage } from '../../../services/messages';
import { clearAccessCookie, clearRefreshCookie, createAccessCookie, createRefreshCookie, getRefreshCookie, refreshCookieName } from './utils';
const { 
    SuccessDelete, 
    UsernameAvailable, 
    SuccessEdit,
    PasswordChangedSuccessfully,
    PasswordResetEmailNotSent,
    PasswordResetEmailSentSuccessfully,
    EmailIsRequiredForPasswordReset,
    PasswordResetSuccessfully } = messages


class UserController {
    static async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers(req.body)
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

    static getUserByToken(_req, res, next) {
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

            createAccessCookie(res, accessToken)
            createRefreshCookie(res, refreshToken)
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
            createAccessCookie(res, accessToken)
            createRefreshCookie(res, refreshToken)

            return res.send(user)
        }
        catch(err) {
            next(err)
        }
    }

    static async refreshToken(req, res) {
        try {
            const refreshToken = getRefreshCookie(req)

            if(refreshToken) {
                const accessToken = await UserService.refreshToken(refreshToken)
                createAccessCookie(res, accessToken)
                return res.send()
            }

            throw new Error()
        }
        
        catch(err) {
            // Clear refresh token
            clearAccessCookie(res)

            // Clear access token
            clearRefreshCookie(res)
            return res.status(401).send()
        }
    }

    static async logout(_req, res, next) {
        try {
            // Clear refresh token
            clearAccessCookie(res)
            // Clear access token
            clearRefreshCookie(res)
            return res.send({ msg: "Logged out successfully" })
        }
        catch(err) {
            next(err)
        }
    }

    static async changePassword(req, res, next) {
        const userId = res.locals.user.id
        const {
            oldPassword,
            newPassword
        } = req.body

        try {
            await UserService.changePassword(userId, oldPassword, newPassword)

            return sendHttpMessage(res, PasswordChangedSuccessfully)
        }

        catch(err) {
            next(err)
        }
    }

    static async editUser(req, res, next) {
        try {
            const editedUser = await UserService.editUser(req.body, res.locals.user.id)
            res.status(SuccessEdit.status).send({
                msg: SuccessEdit.msg,
                user: editedUser
            })
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

    static async sendResetPasswordEmail(req, res, next) {
        const { email } = req.body;
        if (!email) {
            return res
                .status(EmailIsRequiredForPasswordReset.status)
                .send(EmailIsRequiredForPasswordReset);
        }
        try {
            const success = await UserService.sendResetPasswordEmail(email);
    
            if (success) {
                return res
                    .status(PasswordResetEmailSentSuccessfully.status)
                    .send(PasswordResetEmailSentSuccessfully);
            }
    
            return res
                .status(PasswordResetEmailNotSent.status)
                .send(PasswordResetEmailNotSent);
        } catch (err) {
            return next(err);
        }
    }

    static async resetPassword(req, res, next) {
        const { token } = req.params;
    
        const { password } = req.body;

        if (!token) {
            return res.status(400).send("No token provided");
        }

        try {
            await UserService.resetPassword(token, password);
            return res.send(PasswordResetSuccessfully);
        } catch (err) {
            return next(err);
        }
    }
}

export default UserController
