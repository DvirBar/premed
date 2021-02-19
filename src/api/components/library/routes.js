import express from 'express';
const router = express.Router();
const auth = require('../../../../middleware/auth')
const authAdmin = require('../../../../middleware/authAdmin')
import LibraryController from './controller'

// @route   GET api/libraries
// @desc    Get all libraries
// @access  Private
router.get('/', auth, LibraryController.getAll)

// @route   POST api/libraries
// @desc    Create new library
// @access  Admin
router.post('/', [auth, authAdmin], LibraryController.create)

// @route   PUT api/libraries/:id
// @desc    Edit library details
// @access  Admin
router.put('/:id', [auth, authAdmin], LibraryController.update)

// @route   PUT api/libraries/:id/items
// @desc    Add new item
// @access  Admin
router.put('/:id/items', [auth, authAdmin], LibraryController.addItem)

// @route   PUT api/libraries/:id/items/:itemId
// @desc    Edit item
// @access  Admin
router.put('/:id/items/:itemId', [auth, authAdmin], LibraryController.editItem)  

// @route   PUT api/libraries/:id/items/:itemId/vote
// @desc    Upvote or downvote item
// @access  Admin
router.put('/:id/items/:itemId/vote', auth, LibraryController.toggleVote)  

// @route   PUT api/libraries/:id/items/:itemId/remove
// @desc    Remove item
// @access  Admin
router.put('/:id/items/:itemId/remove', [auth, authAdmin], LibraryController.removeItem)  

// @route   DELETE api/libraries/:id
// @desc    Delete library
// @access  Admin
router.delete('/:id', [auth, authAdmin], LibraryController.delete)

export default router