import User from './db/model'
import { 
    compareBcrypt, 
    createAccessToken, 
    createRefreshToken, 
    hashString, 
    userWithoutPassword, 
    verifyRefreshToken} from './utils';

import messages from './messages';

const { 
    InvalidCredentials, 
    NotAuthorizedSelf, 
    UserIsBlocked,
    UserAlreadyExists,
    UsernameAvailable,
    PasswordIncorrect,
    PasswordAlreadyUsed } = messages

class UserService {
    static async getUsers(filters) {
        let count

        if(filters.count) {
            count = await User.countDocuments()
        }

        const limit = 15
        const user = await User.findById(filters.lastUserId) 

        if(user) {
            filters.maxDate = user.date_created
        }
    
        if(!filters.maxDate) {
            filters.maxDate = new Date()
        }
    
        if(!filters.minDate) {
            filters.minDate = new Date(1997, 2, 7)
        }

        const users = await User.getUsers(filters, limit)
        // Tells the client that the server has got all results
        const finished = users.length < limit 

        return { 
            users,
            count,
            finished
        }
    }

    static getUserById(id) {
        return User.getByIdOrFail(id)
    }

    static getUserByEmail(email) {
        return User.getUserByEmail(email)
    }

    static isUsernameAvailable(username) {
        return User.getUserByUsername(username)
    }

    static getUserByToken(user) {
        return userWithoutPassword(user)
    }

    static getUserCount() {
        return User.countDocuments()
    }

    static isUserBlocked(user) {
        return User.isUserBlocked(user)
    }

    // Register user and return login info with token and user
    static async create(data) {
        // Hash password string and create user
        data.newPassword = await hashString(data.newPassword)
        const possibleEmail = await User.getUserByEmail(data.email)
        
        if(possibleEmail) {
            throw UserAlreadyExists
        }

        const possibleUsername = await User.getUserByUsername(data.username)

        if(possibleUsername) {
            throw UsernameAvailable
        }

        const user = await User.createUser(data)

        const payload = { id: user._id }
        // Sign token and return it with created user
        const accessToken = createAccessToken(payload)
        const refreshToken = createRefreshToken(payload)

        const userObj = userWithoutPassword(user) 

        return {
            accessToken,
            refreshToken,
            user: userObj
        }
    }

    static async login(email, loginPassword) {
        try {
            const user = await User.getUserByEmail(email)

        // Validating creadentials and checking that user is not blocked
            if(!user) {
                throw InvalidCredentials
            }
            
            if(User.isUserBlocked(user)) {
                throw UserIsBlocked
            }

            const isMatch = await compareBcrypt(loginPassword, user.password)
            if(!isMatch) {
                const failedAttempts = await User.addFailedAttempt(user)

                if(failedAttempts >= 5) {
                    User.blockUser(user)
                    throw UserIsBlocked
                }

                throw InvalidCredentials
            }
            
        // Authorization completed, log user in
            User.resetFailedAttempts(user)
            const tokenPayload = { id: user._id }
            const accessToken = createAccessToken(tokenPayload)
            const refreshToken = createRefreshToken(tokenPayload)
            const userObj = userWithoutPassword(user) 
            
            return {
                accessToken,
                refreshToken,
                user: userObj
            }
            
        }
        catch(err) {
            throw err
        }
    }

    static async refreshToken(refreshToken) {
        const decoded = verifyRefreshToken(refreshToken)

        const user = await User.getByIdOrFail(decoded.id)
    
        return createAccessToken({ id: user._id})
    }

    static async editUser(user, userId) {
        // TODO: add verification email if email was changed
        const editedUser = await User.editUser(user, userId)
        return userWithoutPassword(editedUser)
    }

    static async changePassword(userId, oldPassword, newPassword) {
        const user = await User.getByIdOrFail(userId)

        // Check that current password is correct
        const isOldMatch = await compareBcrypt(oldPassword, user.password)

        if(!isOldMatch) {
            throw PasswordIncorrect
        }

        // Check that new password wasn't in use before
        if(oldPassword === newPassword) {
            throw PasswordAlreadyUsed
        }

        for(let formerPass of user.formerPasswords) {
            const isMatch = await compareBcrypt(newPassword, formerPass)

            if(isMatch) {
                throw PasswordAlreadyUsed
            }
        }

        const oldHashedPassword = user.password
        // Change password 
        await User.changePassword(user, newPassword)

        // Add old password to former passwords
        await User.addToFormerPasswords(user, oldHashedPassword)
    }

    static async deleteUser(delUserId, reqUserId) {
        if(delUserId === reqUserId) {
            throw NotAuthorizedSelf
        }

        return User.deleteUser(delUserId)
    }
}

export default UserService