const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const DataGroup = require('../../models/DataGroup');
const Path = require('../../models/Path');
const modelName = 'data group';

// Errors
const pathsMessages = require('../../messages/paths');
const dataGroupMessages = require('../../messages/data-group');
const { SuccessDelete, NotExist } = dataGroupMessages;
const { PathNotExist } = pathsMessages;

// @route   GET api/datagroups/:id
// @desc    Get data group by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
    DataGroup.findById(req.params.id)
            .then(group => {
                if(!group) return res.status(NotExist.status).send(NotExist.msg);
                
                return res.json(group);
            })
            .catch(next)
})

// @route   GET api/datagroups
// @desc    Get all datagroups
// @access  Private
router.get('/', auth, (req, res, next) => { 
    DataGroup.find()
        .then(group => res.send(group))
        .catch(next);
})
 
// @route   POST api/datagroups
// @desc    Create new datagroup
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name, 
        pathId 
    } = req.body;

    res.locals.model = modelName;

    Path.findById(pathId)
        .then(path => {
            // Check that assigned path exists
            if(!path) return res.status(PathNotExist.status).send(PathNotExist.msg)

            // Create new path
            const newGroup = new DataGroup({
                name: name,
                path: pathId
            })

            newGroup.save()
                    .then(group => {
                        return res.json(group)
                    })
                    .catch(next);
        })
})

// @route   PUT api/datagroups/:id
// @desc    Update data group
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        pathId 
    } = req.body;

    res.locals.model = modelName;

    const groupId = req.params.id;

    DataGroup.findById(groupId)
            .then(group => {
            // Check that group exists
                if(!group) 
                    return res.status(NotExist.status).send(NotExist.msg)
            
                Path.findById(pathId)
                .then(path => {
                    // Check that assigned path exists
                    if(!path) 
                        return res.status(PathNotExist.status).send(PathNotExist.msg)
                        
                    group.name = name;
                    group.path = pathId;

                    group.save()
                        .then(group => {
                            return res.json(group)              
                        })
                        .catch(next);
                    })
                .catch(next);
            })
});


// @route   DELETE api/datagroups/:id
// @desc    Delete data group
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const groupId = req.params.id;

    DataGroup.findById(groupId)
              .then(group => {
                if(!group) 
                    return res.status(NotExist.status).send(NotExist.msg);

                // TODO: Remove data group from related fields                            
                path.remove()
                .then(() => {
                    return res.send(SuccessDelete.msg)
                })
                .catch(next);
            })
            .catch(next);
})

module.exports = router;
