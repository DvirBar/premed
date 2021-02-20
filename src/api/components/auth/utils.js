import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

export const hashString = async(string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(string, salt)
    }

    catch(err) {
        throw err
    }
}

export const signJwt = payload => {
    return jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 })
}

export const compareBcrypt = (string, hash) => {
    return bcrypt.compare(string, hash)
}

export const userWithoutPassword = user => {
    const {
        password,
        ...newUser
    } = user.toObject()

    return newUser
}