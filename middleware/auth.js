const jwt = require('jsonwebtoken');
import UserService from '../src/api/components/auth/services';
import { getAccessCookie } from '../src/api/components/auth/utils';

const auth = async(req, res, next) => {
    const accessToken = getAccessCookie(req)
    try {
        if(!accessToken) {
            throw new Error("No access token provided")
        }
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        const user = await UserService.getUserById(decoded.id)

        // Check that user isn't blocked
        if(UserService.isUserBlocked(user)) {
            throw 'Blocked user attempted to get protected resource'
        }

        res.locals.user = user
        next()     
    }
    catch(err) {
        return res.status(401).send("Unauthorized")
    }
}


module.exports = auth;