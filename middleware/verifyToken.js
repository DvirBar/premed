import jwt from 'jsonwebtoken'
import config from 'config'
import User from '../src/api/components/auth/db/model';

const verifyToken = (req, res, next) => {
    try {
        const { token } = req.query
        const decoded = jwt.verify(token, config.get('jwtSecretEmail'))   
        
        User.findById(decoded.id)
            .then(user => {
                if(user) {
                    res.locals.user = user
                    next()
                }
                else {
                    next(new Error('No user found on token verification'))
                }
            })
    }
    
    catch(err) {
        return res.status(400).send("Token is invalid or has been expired.")
    }
    
}

export default verifyToken
