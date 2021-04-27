import messages from '../messages'
const { UserDoesNotExist } = messages

export function getAllUsers() {
    return this.find()
}

export function getUserByEmail(email) {
    return this.findOne({ email })
}

export function getUserByUsername(username) {
    return this.findOne({ username })
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

