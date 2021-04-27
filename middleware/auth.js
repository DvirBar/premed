const config = require('config');
const jwt = require('jsonwebtoken');
import { atCookieSettings } from '../src/api/components/auth/controller';
import UserService from '../src/api/components/auth/services';

const auth = async(req, res, next) => {
    const accessToken = req.cookies[atCookieSettings.name]
    try {
        if(!accessToken) {
            throw new Error("No access token provided")
        }
        const decoded = jwt.verify(accessToken, config.get('jwtSecret'))
        const user = await UserService.getUserById(decoded.id)
        res.locals.user = user
        next()
            
    }
    catch(err) {
        return res.status(401).send({ msg: "Unauthorized" })
    }
}


module.exports = auth;