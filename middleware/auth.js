const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {
    const token = req.get('x-auth-token');

    // Check for token
    if(!token) return res.status(401).json({ msg: 'Missing authorization token' })

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Add user from payload
        User.findById(decoded.id) 
            .then(user => {
                res.locals.user = user
                next()
            })
            .catch(err => { return res.status(500).json({ msg: 'Internal server error' }) })
    } catch(e) {
       return res.status(400).json({ msg: 'Token is invalid or has been expired' })
    }
}



module.exports = auth;