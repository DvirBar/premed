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

export const verifyAccessToken = token => {
    return jwt.verify(token, config.get('jwtSecret'))
}

export const verifyRefreshToken = token => {
    return jwt.verify(token, config.get('jwtSecretRefresh'))
}

export const createAccessToken = payload => {
    return jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '15m' })
}

export const createRefreshToken = payload => {
    return jwt.sign(
        payload,
        config.get('jwtSecretRefresh'),
        { expiresIn: '365d' })
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