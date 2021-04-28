import { dateInPast } from '../../../../utils/dates'
import messages from '../messages'
const { UserDoesNotExist } = messages

export function getAllUsers() {
    return this.find().select("-password")
}

export function getUserByEmail(email) {
    return this.findOne({ email })
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
        isStudent,
        ...userObj
    } = user

    const newUser = new this({
        ...userObj
    })

    if(user.isStudent) {
        newUser.isStudent.isPending = true
    }

    return newUser.save()
}

export async function editUser(userDetails, userId) {
    const {
        firstName,
        lastName,
        username,
        isStudent,
        email
    } = userDetails

    try {
        const user = await this.findById(userId) 
        if(!user) {
            throw UserDoesNotExist
        }

        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;

        if(isStudent && !user.isStudent.status) {
            user.isStudent.isPending = true
        }

        else {
            user.isStudent.status = isStudent
        }

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

