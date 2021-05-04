const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const authAdmin = require('../../../../middleware/authAdmin');

import InquiryControllers from './controllers'

// @route   GET api/inquiries/types
// @desc    Get inquiry by id
// @access  Private
router.get('/types', auth, InquiryControllers.getTypes)


// @route   GET api/inquiries
// @desc    Get all inquiries
// @access  Admin
router.get('/', [auth, authAdmin], InquiryControllers.getAll)

// @route   GET api/inquiries
// @desc    Get all user inquiries
// @access  Private
router.get('/user', auth, InquiryControllers.getUserInquiries)


// @route   POST api/inquiries
// @desc    Create new inquiry
// @access  Private
router.post('/', auth, InquiryControllers.create)

// @route   PUT api/inquiries/:id
// @desc    Edit inquiry
// @access  Private
router.put('/:id', auth, InquiryControllers.edit)

// @route   PUT api/inquiries/:id/assignAdmin
// @desc    Create new inquiry
// @access  Admin
router.put('/:id/assignAdmin', [auth, authAdmin], InquiryControllers.assignAdmin)

// @route   PUT api/inquiries/:id/changeStatus
// @desc    Change status
// @access  Admin
router.put('/:id/changeStatus', [auth, authAdmin], InquiryControllers.changeStatus)


// @route   PUT api/inquiries/:id/:statusId
// @desc    Edit status note
// @access  Private
router.put('/:id/:statusId', auth, InquiryControllers.editStatusNote)


// @route   DELETE api/inquiries/:id
// @desc    Delete inquiry
// @access  Private
router.delete('/:id', auth, InquiryControllers.delete)


module.exports = router;
