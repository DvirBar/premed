import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth';
import authAdmin from '../../middleware/authAdmin'

import DataTableController from './controller'


// @route   GET api/dataTable
// @desc    Get all data tables
// @access  Private
router.get('/', auth, DataTableController.getAll)
 
// @route   POST api/datatables
// @desc    Create new data table
// @access  Admin
router.post('/', [auth, authAdmin], DataTableController.create)

// @route   PUT api/datatables/:id/rename
// @desc    Edit data table
// @access  Admin
router.put('/:id', [auth, authAdmin], DataTableController.edit)

// @route   PUT api/datatables/:id/toggleEnabled
// @desc    Toggle enabled status
// @access  Admin
router.put('/:id/toggleEnabled', [auth, authAdmin], DataTableController.toggleEnabled);

// @route   PUT api/datatables/:id/addThreshold
// @desc    Add threshold
// @access  Admin
router.put('/:id/addThreshold', [auth, authAdmin], DataTableController.addThreshold)


// @route   PUT api/datatables/:id/:threshId
// @desc    Edit threshold
// @access  Admin
router.put('/:id/:threshId', [auth, authAdmin], DataTableController.editThreshold)


// @route   PUT api/datatables/:id/:threshId
// @desc    Remove threshold
// @access  Admin
router.put('/:id/:threshId/remove', [auth, authAdmin], DataTableController.removeThreshold)


// @route   DELETE api/datatables/:id
// @desc    Delete data table
// @access  Admin
router.delete('/:id', [auth, authAdmin], DataTableController.delete)

module.exports = router;
