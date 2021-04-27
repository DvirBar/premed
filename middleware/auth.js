const config = require('config');
const jwt = require('jsonwebtoken');
import UserService from '../src/api/components/auth/services';
import { getAccessCookie } from '../src/api/components/auth/utils';

const auth = async(req, res, next) => {
    const accessToken = getAccessCookie(req)
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