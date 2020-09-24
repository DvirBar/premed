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
    ArgsInsuffice, UnauthorizedEdit } = dataMessages;
const { DataFieldNotExist } = fieldsMessages;
const { PathNotExist } = pathsMessages;

import { populate } from '../../models/UserData';
import storedCalcs from '../../utils/calcsIndex';

// @route   GET api/userdata/user
// @desc    Get one user data
// @access  Private
router.get('/user', auth, (req, res, next) => {
    const userId = res.locals.user.id;

    UserData.findOne({ user: userId })
            .populate('dataVals.field')
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

                            const values = data.dataVals;
                            let found = false
                            
            // If the user already has a value for the field
                            for(let item of values) {
                                if(item.field.equals(fieldId)) {
                                    item.value = value;
                                    found = true;
                                    break;
                                }
                            }

            // If the field is yet to have a value
                            if(!found) {
                                data.dataVals.push({
                                    field: fieldId,
                                    value
                                })
                            }

                            data.save()
                                .then(data => {
                                    async function populateData() {
                                        await data.populate("dataVals.field").execPopulate();
                                        const valueObj = data.dataVals.find(val => 
                                            val.field._id.equals(fieldId))
                                        return res.send(valueObj); 
                                    }
                                    populateData();
                                })
                                .catch(err => {throw err}); // Save user data
                         })
                         .catch(err =>  {throw err}); // Find data field
            })
            .catch(next); // Find user data
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


// @route   PUT api/calculations/execCalc
// @desc    Execute calculation
// @access  Private
router.put('/execCalc/:storCalcId', auth, (req, res, next) => {

    const storCalcId = req.params.storCalcId;
    const storCalc = storedCalcs.find(calc => calc.id === storCalcId);
    const userId = res.locals.user.id;

    UserData.findOne({ user: userId })
            .populate({
                path: 'dataVals.field',
                populate: { path: 'group' }
            })
            .then(data => {
                if(!data)
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)

                const values = data.dataVals
                const params = {}

                for(let arg of storCalc.args) {

                     // If arg is a group, map its nested arguments and create a group object
                     if(arg.type === "group") {
                        let groupArgs = {} // Object for the group's nested arguments

                        // Find all values that belong to the group
                        const groupVals = values.filter(val => val.field.group?.role === arg.role)
                        
                        // Check that all group fields have a value
                        if(groupVals.length !== arg.fields.length) {
                            return res.status(ArgsInsuffice.status)
                                      .send(ArgsInsuffice.msg)
                        }
                        
                        // Iterate all group fields
                        for(let value of groupVals) {
                            let valField = value.field 

                            /* Match value role to group field role and create a key-value 
                            pair of its argument's name and numeric value */
                            const varName = arg.fields.find(argField => 
                                argField.role === valField.role).varName

                            groupArgs[varName] = value.value
                        }
                        
                        params[arg.varName] = groupArgs

                    }

                    else {
                        const argValue = values.find(val => val.role === arg.role)

                        if(!argValue)
                            return res.status(ArgsInsuffice.status)
                                    .send(ArgsInsuffice.msg)

                        params[arg.varName] = argValue.value
                    }
                }

                const calcResult = storCalc.func(params);

                DataField.find({ calcOutput: { $exists: true }})
                         .populate('calcOutput')
                         .then(fields => {
                            const calcField = fields.find(field => 
                            field.calcOutput.calc === storCalc.id)

                            const calcOutput = calcField.calcOutput
                        
                            let found = false
                            const fieldId = calcField._id
                        
                            // If the user already has a value for the field
                            for(let item of values) {
                                if(item.field.equals(fieldId)) {

                                    if(!calcOutput.isSuggestion) {
                                        item.value = calcResult;
                                    }
                                    else {
                                        item.suggestValue = calcResult;
                                    }
                                    found = true;
                                    break;
                                }
                            }
                
                            // If the field is yet to have a value
                            if(!found) {
                                if(!calcOutput.isSuggestion) {
                                    data.dataVals.push({
                                        field: fieldId,
                                        value: calcResult
                                    })
                                }

                                else {
                                    data.dataVals.push({
                                        field: fieldId,
                                        suggestValue: calcResult
                                    })
                                }
                            }

                        data.save()
                        .then(data => {
                            async function populateData() {
                                await data.populate("dataVals.field").execPopulate();
                                const valueObj = data.dataVals.find(val => 
                                    val.field._id.equals(fieldId))
                                return res.send(valueObj); 
                            }
                            populateData();
                        })
                        .catch(next);
                    })
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
