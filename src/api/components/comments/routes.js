import express from 'express'
const router = express.Router()
const auth = require('../../../../middleware/auth');
import * as CommentController from './controller';

// @route   GET api/comments/:itemId
// @desc    Get comment by item
// @access  Private
router.get('/:itemId', auth, CommentController.getByItem)

// @route   POST api/comments
// @desc    Add comment
// @access  Private
router.post('/', auth, CommentController.create)

// @route   PUT api/comments/:id
// @desc    Edit comment
// @access  Private
router.put('/:id', auth, CommentController.edit)

// @route   PUT api/comments/:id/vote
// @desc    Toggle like
// @access  Private
router.put('/:id/vote', auth, CommentController.toggleLike)


// @route   DELETE api/comments/:id
// @desc    Delete comment
// @access  Private (Admin allowed)
router.delete('/:id', auth, CommentController.remove)
 

export default router