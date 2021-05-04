const express = require('express');
const router = express.Router();
const auth = require('../../../../middleware/auth');
const { default: ServerDataController } = require('./controllers');

const sdController = new ServerDataController

// @route   GET api/serverdata/baseData
// @desc    Get all paths
// @access  Public
router.get('/baseData', sdController.getBaseData)

// @route   GET api/serverdata/statsData
// @desc    Get stats data
// @access  Private 
router.post('/statsData', auth, sdController.getStatsData)

// @route   GET api/serverdata/tableSections
// @desc    Get tableSections
// @access  Private 
router.get('/tableSections', auth, sdController.getTableSections)


export default router