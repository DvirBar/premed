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
    UsernameAvailable } = messages

class UserService {
    static getAllUsers() {
        return User.getAllUsers()
    }

    static getUserById(id) {
        return User.getByIdOrFail(id)
    }

    static isUsernameAvailable(username) {
        return User.getUserByUsername(username)
    }

    static getUserByToken(user) {
        return userWithoutPassword(user)
    }

    static isUserBlocked(user) {
        return User.isUserBlocked(user)
    }

    // Register user and return login info with token and user
    static async create(data) {
        // Hash password string and create user
        data.password = await hashString(data.password)
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
            
        // Verification completed, log user in
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

    static async deleteUser(delUserId, reqUserId) {
        if(delUserId === reqUserId) {
            throw NotAuthorizedSelf
        }

        return User.deleteUser(delUserId)
    }
}

export default UserService