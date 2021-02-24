const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

import QuestionControllers from './controllers'

// @route   GET api/questgroups
// @desc    Get all question groups
// @access  Public
router.get('/', QuestionControllers.getAll)

// @route   GET api/questgroups/path/:pathId
// @desc    Get all question group by path
// @access  Public
router.get('/path/:pathId', QuestionControllers.getByPath)

// @route   POST api/questgroups
// @desc    Create new question group
// @access  Admin
router.post('/', [auth, authAdmin], QuestionControllers.create)

// @route   PUT api/questgroups/:id
// @desc    Update question group
// @access  Admin
router.put('/:id', [auth, authAdmin], QuestionControllers.edit);

// @route   PUT api/questgroups/:id/addQuestion
// @desc    Add question
// @access  Admin
router.put('/:id/addQuestion', [auth, authAdmin], QuestionControllers.addQuestion);

// @route   PUT api/questgroups/:id/:questionId
// @desc    Update question
// @access  Admin
router.put('/:id/:questId', [auth, authAdmin], QuestionControllers.editQuestion);

// @route   PUT api/questgroups/:groupId/:questionId/remove
// @desc    Update question
// @access  Admin
router.put('/:groupId/:questId/remove', [auth, authAdmin], QuestionControllers.removeQuestion);


// @route   DELETE api/questiongroups/:id
// @desc    Delete question group
// @access  Admin
router.delete('/:id', [auth, authAdmin], QuestionControllers.delete)

module.exports = router;
