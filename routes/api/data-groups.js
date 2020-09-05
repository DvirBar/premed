const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const DataGroup = require('../../models/DataGroup');
const Path = require('../../models/Path');
const University = require('../../models/University');
const modelName = 'data group';

// Errors
const pathsMessages = require('../../messages/paths');
const dataGroupMessages = require('../../messages/data-groups');
const uniMessages = require('../../messages/universities');

const { DataGroupSuccessDelete, DataGroupNotExist } = dataGroupMessages;
const { PathNotExist } = pathsMessages;
const { UniNotExist } = uniMessages;

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
        pathId,
        parentId
    } = req.body;

    res.locals.model = modelName;

    Path.findById(pathId)
        .then(path => {
            // Check that assigned path exists
            if(!path) 
                return res.status(PathNotExist.status).send(PathNotExist.msg)

            DataGroup.findById(parentId)
                      .then(group => {
                        if(!group && uniId)
                            return res.status(DataGroupNotExist.status)
                                      .send(DataGroupNotExist.msg)

                        // Create new path
                        const newGroup = new DataGroup({
                            name: name,
                            path: pathId,
                            parent: parentId
                        })

                        newGroup.save()
                                .then(group => {
                                    return res.json(group)
                                })
                                .catch(next); // Save group
                      })
                      .catch(next); // Find parent data group
        })
        .catch(next) // Find path
})

// @route   PUT api/datagroups/:id
// @desc    Update data group
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        parentId
    } = req.body;

    res.locals.model = modelName;

    const groupId = req.params.id;

    DataGroup.findById(groupId)
            .then(group => {
            // Check that group exists
                if(!group) 
                    return res.status(DataGroupNotExist.status)
                              .send(DataGroupNotExist.msg)

                    DataGroup.findById(parentId)
                             .then(parent => {
                                if(!parent && parentId)
                                    return res.status(DataGroupNotExist.status)
                                              .send(DataGroupNotExist.msg)
                                
                                group.name = name;
                                group.parent = parentId;

                                group.save()
                                    .then(group => {
                                        return res.json(group)              
                                    })
                                    .catch(next); // Save group
                             })
                             .catch(next); // Find parent data group
            })
            .catch(next); // Find data group
});


// @route   DELETE api/datagroups/:id
// @desc    Delete data group
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const groupId = req.params.id;

    DataGroup.findById(groupId)
              .then(group => {
                if(!group) 
                    return res.status(DataGroupNotExist.status)
                              .send(DataGroupNotExist.msg);

                // TODO: Remove data group from related fields                            
                group.remove()
                .then(() => {
                    return res.send(DataGroupSuccessDelete.msg)
                })
                .catch(next);
            })
            .catch(next);
})

module.exports = router;
