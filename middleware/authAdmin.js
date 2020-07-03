const authAdmin = (req, res, next) => {
    try {
        if(!res.locals.user.isAdmin)
            return res.status(401).json({ msg: 'You are unauthorized!' })
        
        next();
    }
    catch(e) {
        return res.status(500).json({ msg: 'Internal server error' })
    }       
}

module.exports = authAdmin;