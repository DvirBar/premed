const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const UserData = require('../../models/UserData');
const DataField = require('../../models/DataField');
const Path = require('../../models/Path');
const modelName = 'user data';

// Errors
const dataMessages = require('../../messages/user-data');
const fieldsMessages = require('../../messages/data-fields');
const authMessages = require('../../messages/auth');
const pathsMessages = require('../../messages/paths');


const { SuccessDelete, UserDataAlreadyExist, DataNotExist,
    UnauthorizedEdit } = dataMessages;
const { DataFieldNotExist } = fieldsMessages;
const { PathNotExist } = pathsMessages;

// @route   GET api/userdata/user
// @desc    Get one user data
// @access  Private
router.get('/user', auth, (req, res, next) => {
    const userId = res.locals.user.id;

    UserData.findOne({ user: userId })
            .then(data => {
                if(!data) 
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg);
                
                return res.send(data);
            })
            .catch(next)
})

// @route   GET api/userdata/:pathId
// @desc    Get all users data by path
// @access  Private
router.get('/:pathId', auth, (req, res, next) => { 
    const pathId = req.params.pathId;

    Path.findById(pathId)
        .then(path => {
            if(!path)
                return res.status(PathNotExist.status)
                          .send(PathNotExist.msg)
            
            UserData.find({ $and: [{ paths: pathId }, { enabled: true }] })
            .select("-user")
            .then(data => res.send(data))
            .catch(next);                  
        })
        .catch(next);
})
 
// @route   POST api/userdata
// @desc    Create user data entry
// @access  Private
router.post('/', auth, (req, res, next) => {
    const { 
        pathIds
    } = req.body;

    const userId = res.locals.user.id

    res.locals.model = modelName;

    UserData.findOne({ user: userId})
            .then(user => {
                if(user)
                    return res.status(UserDataAlreadyExist.status)
                              .send(UserDataAlreadyExist.msg)
                
                // Create new user data entry
                const newData = new UserData({
                    user: userId,
                    paths: pathIds
                })

                newData.save()
                        .then(data => {
                            return res.send(data)
                        })
                        .catch(next); // Save data entry
            })
            // Check that user data entry doesn't already exist
            .catch(next); 
        })

// @route   PUT api/userdata/editpaths
// @desc    Update data group
// @access  Private
router.put('/editpaths', auth, (req, res, next) => {
    const { 
        pathIds
    } = req.body;

    res.locals.model = modelName;

    const userId = res.locals.user.id;

    UserData.findOne({ user: userId })
            .then(data => {
            // Check that group exists
                if(!data) 
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)
                                
                data.paths = pathIds;

                data.save()
                    .then(data => {
                        return res.send(data)              
                    })
                    .catch(next); // Save user data
            })
            .catch(next); // Find user data
});


// @route   PUT api/userdata/insertdata
// @desc    Insert data 
// @access  Private
router.put('/insertdata', auth, (req, res, next) => {
    const {
        fieldId,
        value
    } = req.body;

    const userId = res.locals.user.id


    UserData.findOne({ user: userId })
            .then(data => {
                if(!data)
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)
                    
                DataField.findById(fieldId)
                         .then(field => {
                            if(!field)
                                return res.status(DataFieldNotExist.status)
                                          .send(DataFieldNotExist.msg)

                            const values = data.values;
                            let found = false
                            
                            // If the user already has a value for the field
                            

                            data.values.push({
                                field: fieldId,
                                value
                            })
                            data.save()
                                .then(data => {
                                    return res.send(data)
                                })
                                .catch(next);
                         }
            })
            .catch(next);
})

// @route   PUT api/userdata/toggleEnabled
// @desc    Assign role to data group
// @access  Admin
router.put('/toggleEnabled', [auth, authAdmin], (req, res, next) => {

    const userId = res.locals.user.id

    UserData.findOne({ user: userId })
            .then(data => {
                if(!data)
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)
                    
                data.enabled = !data.enabled
                data.save()
                    .then(data => {
                        return res.send(data)
                    })
                    .catch(next);
            })
            .catch(next);
})


// @route   DELETE api/userdata/:userId
// @desc    Delete user data
// @access  Admin
router.delete('/:userId', [auth, authAdmin], (req, res, next) => {

    UserData.findOne({ user: userId})
              .then(data => {
                if(!data) 
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg);

                data.remove()
                .then(() => {
                    return res.send(SuccessDelete.msg)
                })
                .catch(next); // Remove data
            })
            .catch(next); // Find user data
})

module.exports = router;
