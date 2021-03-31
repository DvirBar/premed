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
                    throw 'No user found on token verification'
                }
            })
        
    }
    
    catch(err) {
        next(err)
    }
    
}

export default verifyToken
