import express from 'express'
const router = express.Router()
import auth from '../../../../../middleware/auth';
import authAdmin from '../../../../../middleware/authAdmin';
import * as AnnouncementsControllers from './controllers';

// @route   GET api/announcements
// @desc    Get last five announcements
// @access  Private
router.get('/', AnnouncementsControllers.getLast)

// @route   GET api/announcements/ancsList
// @desc    Get a list of ten next announcements
// @access  Private
router.post('/ancsList', AnnouncementsControllers.getAncsList)

// @route   POST api/announcements
// @desc    Add announcement
// @access  Admin
router.post('/', [auth, authAdmin], AnnouncementsControllers.create)

// @route   PUT api/announcements/:id
// @desc    Edit announcement
// @access  Admin
router.put('/:id', [auth, authAdmin], AnnouncementsControllers.edit)

// @route   DELETE api/announcements/:id
// @desc    Remove announcements 
// @access  Admin
router.delete('/:id', [auth, authAdmin], AnnouncementsControllers.remove)
 

export default router