const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

import internalData from '../../utils/internalData';
import fields from '../../utils/stats/fields/dataFields';
import groups from '../../utils/stats/groups/dataGroups';
import storedCalcs from '../../utils/stats/calcs/storedCalcs';

// @route   GET api/serverdata/baseData
// @desc    Get all paths
// @access  Private
router.get('/baseData', (req, res, next) => { 
    res.send(internalData)
})

router.post('/statsData', auth, (req, res, next) => {
    const {
        pathIds
    } = req.body

    const getByPathIds = arr => {
        return arr.filter(item => 
            item.paths && item.paths.find(path => 
                pathIds.includes(path))
            || !item.paths)
    }

    const resObj = {
        fields: getByPathIds(fields),
        groups: getByPathIds(groups),
        calcs: getByPathIds(storedCalcs)
    }

    return res.send(resObj)
})


module.exports = router;
