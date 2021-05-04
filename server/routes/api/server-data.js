const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

import internalData from '../../utils/internalData';
import fields from '../../utils/stats/fields/dataFields';
import groups from '../../utils/stats/groups/dataGroups';
import storedCalcs from '../../utils/stats/calcs/storedCalcs';
import { 
    getByPaths, 
    getUnisByPath, 
    getInputsByUniAndPath } from '../../utils/selectors';

const { unis, paths } = internalData

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

    const resObj = {
        fields: getByPaths(fields, pathIds),
        groups: getByPaths(groups, pathIds),
        calcs: getByPaths(storedCalcs, pathIds)
    }

    return res.send(resObj)
})

router.get('/tableSections', auth, (req, res, next) => {
    let resObj = paths.reduce((obj, path) => {
        return {
            ...obj,
            [path._id]: [
                {
                    _id: 'no-uni',
                    name: 'כללי',
                    fields: [
                        ...getInputsByUniAndPath(undefined, path._id)
                    ]
                },
                ...getUnisByPath(path._id).map(uni => ({
                    ...uni,
                    fields: getInputsByUniAndPath(uni._id,  path._id)
                }))
            ]
        }
    }, {})

    return res.send(resObj)
})



module.exports = router;
