import express from 'express'
const router = express.Router()
import verifyToken from '../../middleware/verifyToken'
import config from 'config'

router.get('/unsubscribe', verifyToken, (req, res, next) => {
    try {
        const { token } = req.query
        const link = `${config.get('serverURI')}/api/announcements/groups/unsubscribeAll?token=${token}`
        res.render('unsubscribe', { link })
    }
    
    catch(err) {
        next(err)
    }
})

export default router