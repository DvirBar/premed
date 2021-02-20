const config = require('config');
const jwt = require('jsonwebtoken');
import User from '../src/api/components/auth/db/model';

const auth = (req, res, next) => {
    const token = req.get('x-auth-token');

    // Check for token
    if(!token) 
        return res.status(401)
                  .send({ msg: 'Missing authorization token' })

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Add user from payload
        User.findById(decoded.id) 
            .then(user => {
                res.locals.user = user
                next()
            })
            .catch(err => { 
                return res.status(500).send({ msg: 'Internal server error' }) 
            })
    } catch(e) {
       return res.status(400).send({ msg: 'Token is invalid or has been expired' })
    }
}



module.exports = auth;