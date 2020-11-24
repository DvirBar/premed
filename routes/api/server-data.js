const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

import internalData from '../../utils/internalData';
import { fields } from '../../utils/stats/dataFields';
import { bagrut, bagrutTypes } from '../../utils/stats/dataGroups';
import storedCalcs from '../../utils/stats/calcs/storedCalcs';

// @route   GET api/serverdata/baseData
// @desc    Get all paths
// @access  Private
router.get('/baseData', (req, res, next) => { 
    res.send(internalData)
})

router.get('/statsData', auth, (req, res, next) => {
    const resObj = {
        fields,
        groups: bagrut,
        calcs: storedCalcs,
        types: {
            bagrutTypes
        }
    }

    return res.send(resObj)
})


module.exports = router;
