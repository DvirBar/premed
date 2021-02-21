import User from './db/model'
import { 
    compareBcrypt, 
    hashString, 
    signJwt, 
    userWithoutPassword } from './utils';

import messages from './messages'

const { InvalidCredentials, NotAuthorizedSelf } = messages

class UserService {
    static getAllUsers() {
        return User.getAllUsers()
    }

    static getUserByToken(user) {
        return userWithoutPassword(user)
    }

    // Register user and return login info with token and user
    static async create(data) {
            // Hash password string and create user
            data.password = await hashString(data.password)

            const user = await User.createUser(data)

            // Sign token and return it with created user
            const token = signJwt({ id: user._id })

            const userObj = userWithoutPassword(user) 

            return {
                token,
                user: userObj
            }
    }

    static async login(email, loginPassword) {
        try {
            const user = await User.getUserByEmail(email)
            if(!user) {
                throw InvalidCredentials
            }

            const isMatch = await compareBcrypt(loginPassword, user.password)
            if(!isMatch) {
                throw InvalidCredentials
            }

            const token = signJwt({ id: user._id })
            const userObj = userWithoutPassword(user) 

            return {
                token,
                user: userObj
            }
        }
        catch(err) {
            throw err
        }
    }

    static async editUser(user, userId) {
        try {
            // TODO: add verification email if email was changed
            const editedUser = await User.editUser(user, userId)
            return userWithoutPassword(editedUser)
        }
        catch(err) {
            next(err)
        }
    }

    static async deleteUser(delUserId, reqUserId) {
        if(delUserId === reqUserId) {
            throw NotAuthorizedSelf
        }

        return User.deleteUser(delUserId)
    }
}

export default UserService