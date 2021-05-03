import { dateInPast } from '../../../../utils/dates'
import messages from '../messages'
const { 
    UserDoesNotExist, 
    UserAlreadyExists, 
    UsernameUnavailable } = messages

export function getAllUsers() {
    return this.find().select("-password")
}

export function getUserByEmail(email) {
    return this.findOne({ email: email.toLowerCase() })
}

export function getUserByUsername(username) {
    return this.findOne({ username })
}

export async function addFailedAttempt(user) {
    user.failedAttempts = user.failedAttempts + 1
    await user.save() 

    return user.failedAttempts
}

export function resetFailedAttempts(user) {
    user.failedAttempts = 0
    return user.save() 
}

export function blockUser(user, expiry) {
    user.blocked.isBloked = true
    user.blocked.expiry = expiry 

    return user.save()
}

export function isUserBlocked(user) {
    if(user?.blocked?.isBlocked) {
        const expiry = user.blocked.expiry
    
        // If no expiry and user is blocked
        if(!expiry) {
            return true
        }

        // If expiry date had not passed
        if(!dateInPast(expiry)) {
            return true
        }
        
        // If expiry date had passed, remove block
        user.blocked = undefined
        user.save()
        return false
    }
    
    return false
}

export function createUser(user) {
    const {
        email,
        password,
        username,
        firstName,
        lastName
    } = user
    
    const newUser = new this({
        email,
        password,
        username,
        firstName,
        lastName,
        isAdmin: false
    })

    return newUser.save()
}

export async function editUser(userDetails, userId) {
    const {
        firstName,
        lastName,
        username,
        email
    } = userDetails

    try {
        const user = await this.findById(userId) 
        if(!user) {
            throw UserDoesNotExist
        }

        const possibleEmail = await this.getUserByEmail(email)
        const possibleUsername = await this.getUserByUsername(username)

        if(possibleEmail && email.toLowerCase() !== user.email) {
            throw UserAlreadyExists
        }

        if(possibleUsername && username !== user.username) {
            throw UsernameUnavailable
        }

        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;

        return user.save()
    } 

    catch(err) {
        throw err
    } 
}

export async function deleteUser(userId) {
    try {
        const user = await this.findById(userId)

        if(!user) {
            throw UserDoesNotExist
        }

        user.remove()
    }
    catch(err) {
        next(err)
    }
}

