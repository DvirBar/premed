const authAdmin = (req, res, next) => {
    try {
        if(!res.locals.user.isAdmin)
            return res.status(403).send({ msg: 'You are unauthorized!' })
        
        next();
    }
    catch(e) {
        return res.status(500).send({ msg: 'Internal server error' })
    }       
}

module.exports = authAdmin;