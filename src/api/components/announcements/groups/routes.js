const express = require('express');
const router = express.Router();
import auth from '../../../../../middleware/auth';
import authAdmin from '../../../../../middleware/authAdmin';
import verifyToken from '../../../../../middleware/verifyToken';
import * as AncGroupsControllers from './controllers'

// @route   GET api/announcements/group
// @desc    Get announcement groups 
// @access  Admin
router.get('/', [auth, authAdmin], AncGroupsControllers.getAll)

// @route   GET api/announcements/group
// @desc    Get announcement groups with user subsbriptions
// @access  Public
router.get('/subs', auth, AncGroupsControllers.getAllWithSubs)

// @route   POST api/announcements/groups
// @desc    Create new announcement group 
// @access  Admin
router.post('/', [auth, authAdmin], AncGroupsControllers.create)

// @route   PUT api/anouncements/groups/toggleSubscribe
// @desc    Toggle subscription 
// @access  Admin
router.put('/toggleSubscribe', auth, AncGroupsControllers.toggleSubscribe)

// @route   POST api/anouncements/groups/toggleSubscribe
// @desc    Toggle subscription 
// @access  Private
router.post('/unsubscribeAll', verifyToken, AncGroupsControllers.unsubscribeAll)

// @route   PUT api/anouncements/groups/:id
// @desc    edit announcement group 
// @access  Admin
router.put('/:id', [auth, authAdmin], AncGroupsControllers.edit)

// @route   DELETE api/anouncements/groups/:id
// @desc    Toggle subscription 
// @access  Admin
router.delete('/:id', [auth, authAdmin], AncGroupsControllers.remove)

module.exports = router;
