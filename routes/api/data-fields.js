const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const DataField = require('../../models/DataField');
const DataGroup = require('../../models/DataGroup');
const Path = require('../../models/Path');
const modelName = 'data field';

// Utilities
const allowedTypes = require('../../utils/allowedTypes');

// Errors
const dataGroupMessages = require('../../messages/data-groups');
const dataFieldMessages = require('../../messages/data-fields');
const pathMessages = require('../../messages/paths');

const { DataFieldSuccessDelete, DataFieldNotExist, 
    InvalidFieldType, InvalidValidatorType, 
    ValidatorTypeRequired, ValidatorNotExist } = dataFieldMessages;
const { DataGroupSuccessDelete, DataGroupNotExist } = dataGroupMessages;
const { PathNotExist } = pathMessages; 


// @route   GET api/datafields/:id
// @desc    Get data group by id
// @access  Public
router.get('/:id', (req, res, next) => {
    DataField.findById(req.params.id)
            .then(field => {
                if(!field) 
                    return res.status(DataFieldNotExist.status).send(DataFieldNotExist.msg);
                
                return res.send(field);
            })
            .catch(next)
})

// @route   GET api/datafields
// @desc    Get all data fields
// @access  Public
router.get('/', (req, res, next) => { 
    DataField.find()
        .then(field => res.send(field))
        .catch(next);
})
 
// @route   POST api/datafields
// @desc    Create new data field
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        type,
        pathId,
        groupId,
    } = req.body;

    res.locals.model = modelName;

    // Check that field type is valid
    if(!allowedTypes.isType(type, allowedTypes.fieldTypes))
        return res.status(InvalidFieldType.status)
                  .send(InvalidFieldType.msg)

    Path.findById(pathId)
        .then(path => {

            // Check that if assigned, path exists
            if(!path && pathId)
                return res.status(PathNotExist.status)
                          .send(PathNotExist.msg)
            
            DataGroup.findById(groupId)
                    .then(group => {

                        // Check that if assigned, group exists
                        if(!group && groupId)
                            return res.status(DataGroupNotExist.status)
                                      .send(DataGroupNotExist.msg)
                                    
                        // Create new field
                        const newField = new DataField({
                            name: name,
                            type: type,
                            path: pathId,
                            group: groupId
                        })

                        newField.save()
                                .then(field => {
                                    return res.send(field)
                                })
                                .catch(next); // Saving field
                        })
                        .catch(next); // Find data group
        })
        .catch(next); // Find path
})


//  // Check that ratio sum does not exceed 100% 
//  DataGroup.aggregate([
//     { $match: { 'parent.group': groupId }},
//     { $group: { _id: 'parent.group', sum: { $sum: '$ratio' }}}
// ]).then(sumGroup => {
//     const ratioSum = sumGroup + groupRatio;

//     if(groupRatio) {
//         // Check that ratio is between 0 and 100
//         if(groupRatio <= 0 || groupRatio > 100 )
//             return res.status(RatioExceeds.status)
//                 .send(RatioExceeds.msg)

//     if(ratioSum > 100)
//         return res.status(RatioSumExceeds.status)
//                 .send(RatioSumExceeds.msg)
//     }
    

// @route   PUT api/datafields/:id
// @desc    Update data field
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        type,
        pathId,
        groupId
    } = req.body;

    res.locals.model = modelName;

    const fieldId = req.params.id;

    // Check that field type is valid
    if(!allowedTypes.isType(type, allowedTypes.fieldTypes))
        return res.status(InvalidFieldType.status)
                  .send(InvalidFieldType.msg)

    Path.findById(pathId)
        .then(path => {
            // Check that if assigned, path exists
            if(!path && pathId)
                return res.status(PathNotExist.status)
                          .send(PathNotExist.msg)
            
            DataGroup.findById(groupId)
                     .then(group => {

                        // Check that if assigned, group exists
                        if(!group && groupId)
                            return res.status(DataGroupNotExist.status)
                                      .send(DataGroupNotExist.msg)
                                    
                        DataField.findById(fieldId)
                                 .then(field => {
                                    if(!field)
                                        return res.status(DataFieldNotExist.status)
                                                  .send(DataFieldNotExist.msg)
                                    
                                    field.name = name,
                                    field.type = type,
                                    field.pathId = pathId,
                                    field.groupId = groupId,
                                    
                                    field.save()
                                            .then(field => {
                                                return res.send(field)
                                            })
                                            .catch(next); // Saving field
                                 })
                                 .catch(next); // Find data field
                        })
                        .catch(next); // Find data group
        })
        .catch(next); // Find path
});

// @route   PUT api/datafields/:id/addValid
// @desc    Add validator
// @access  Admin
router.put('/:id/addValid', [auth, authAdmin], (req, res, next) => {
    const { 
        type,
        min,
        max
    } = req.body;

    res.locals.model = modelName;

    const fieldId = req.params.id;

    // Check that user entered a validator type
    if(!type)
        return res.status(ValidatorTypeRequired.status)
                  .msg(ValidatorTypeRequired.msg)

    // Check that field type is valid
    if(!allowedTypes.isType(type, allowedTypes.validationTypes))
        return res.status(InvalidValidatorType.status)
                  .send(InvalidValidatorType.msg)

    DataField.findById(fieldId)
             .then(field => {
                if(!field)
                    return res.status(DataFieldNotExist.status)
                              .send(DataFieldNotExist.msg)
                
                const newValidator = {
                    validType: type,
                    min: min,
                    max: max
                }

                field.validators.push(newValidator)

                field.save()
                     .then(field => {
                         return res.send(field)
                     })
                     .catch(next); // Saving field
             })
             .catch(next); // Find data field
});


// @route   PUT api/datafields/:id/:validId
// @desc    Edit validator
// @access  Admin
router.put('/:id/:validId', [auth, authAdmin], (req, res, next) => {
    const { 
        type,
        min,
        max
    } = req.body;

    res.locals.model = modelName;

    const fieldId = req.params.id;
    const validId = req.params.validId;

    // Check that user entered a validator type
    if(!type)
        return res.status(ValidatorTypeRequired.status)
                  .msg(ValidatorTypeRequired.msg)

    // Check that field type is valid
    if(!allowedTypes.isType(type, allowedTypes.validationTypes))
        return res.status(InvalidValidatorType.status)
                  .send(InvalidValidatorType.msg)

    DataField.findById(fieldId)
             .then(field => {
                if(!field)
                    return res.status(DataFieldNotExist.status)
                              .send(DataFieldNotExist.msg)

                const validator = field.validators.id(validId)

                if(!validator)
                    return res.status(ValidatorNotExist.status)
                              .msg(ValidatorNotExist.msg)

                validator.set({
                    validType: type,
                    min: min,
                    max: max
                })

                field.save()
                     .then(field => {
                         return res.send(field)
                     })
                     .catch(next); // Saving field
             })
             .catch(next); // Find data field
});

// @route   PUT api/datafields/:id/:validId/remove
// @desc    Remove validator
// @access  Admin
router.put('/:id/:validId/remove', [auth, authAdmin], (req, res, next) => {
    const fieldId = req.params.id;
    const validId = req.params.validId;

    DataField.findById(fieldId)
             .then(field => {
                 if(!field) 
                    return res.status(DataFieldNotExist.status)
                              .send(DataFieldNotExist.msg)
                    
                const validator = field.validators.id(validId)
                
                if(!validator)
                    return res.status(ValidatorNotExist.status)
                              .send(ValidatorNotExist.msg)

                validator.remove()

                field.save()
                     .then(field => {
                         return res.send(field)
                     })
                     .catch(next); // Saving field
             })
             .catch(next); // Saving field
});


// @route   DELETE api/datafields/:id
// @desc    Delete data field
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const fieldId = req.params.id;

    DataField.findById(groupId)
              .then(field => {
                if(!field) 
                    return res.status(DataFieldNotExist.status)
                              .send(DataFieldNotExist.msg);
                           
                field.remove()
                .then(() => {
                    return res.send(DataFieldSuccessDelete.msg)
                })
                .catch(next);
            })
            .catch(next);
})

module.exports = router;
