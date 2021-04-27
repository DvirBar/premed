import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

const refreshTokenExp = 31536000 // 1 year
const accessTokenExp = 900 // 15 minutes

const refreshCookieSettings = {
    name: '_rt',
    options: {
        httpOnly: true,
        path: '/api/auth/refreshToken',
        maxAge: refreshTokenExp * 1000
    }
}

const accessCookieSettings = {
    name: '_at',
    options: {
        httpOnly: true,
        maxAge: accessTokenExp * 1000
    }
}

export const cookieSettings = {
    access: accessCookieSettings,
    refresh: refreshCookieSettings
}

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
        { expiresIn: accessTokenExp })
}

export const createRefreshToken = payload => {
    return jwt.sign(
        payload,
        config.get('jwtSecretRefresh'),
        { expiresIn: refreshTokenExp })
}

export const createAccessCookie = (res, token) => {
    return res.cookie(
        accessCookieSettings.name, 
        token, 
        accessCookieSettings.options
    )
}

export const createRefreshCookie = (res, token) => {
    return res.cookie(
        refreshCookieSettings.name, 
        token, 
        refreshCookieSettings.options
    )
}

export const clearAccessCookie = req => {
    return req.clearCookie(
        accessCookieSettings.name,  
        accessCookieSettings.options
    )
}

export const clearRefreshCookie = req => {
    return req.clearCookie(
        refreshCookieSettings.name,  
        refreshCookieSettings.options
    )
}

export const getAccessCookie = res => {
    return res.cookies[accessCookieSettings.name]
}

export const getRefreshCookie = res => {
    return res.cookies[refreshCookieSettings.name]
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