import express from 'express'
const router = express.Router()
import verifyToken from '../../middleware/verifyToken'

router.get('/unsubscribe', verifyToken, (req, res, next) => {
    try {
        const { token } = req.query
        const link = `${process.env.SERVER_URI}/api/announcements/groups/unsubscribeAll?token=${token}`
        res.render('unsubscribe', { link })
    }
    
    catch(err) {
        next(err)
    }
})

export default router