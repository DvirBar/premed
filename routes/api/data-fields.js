const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const DataField = require('../../models/DataField');
const DataGroup = require('../../models/DataGroup');
const Path = require('../../models/Path');
const University = require('../../models/University');
const modelName = 'data field';

// Utilities
const allowedTypes = require('../../utils/allowedTypes');
const types = allowedTypes.types

// Errors
const dataGroupMessages = require('../../messages/data-groups');
const dataFieldMessages = require('../../messages/data-fields');
const pathMessages = require('../../messages/paths');
const uniMessages = require('../../messages/universities')

const { DataFieldSuccessDelete, DataFieldNotExist, 
    InvalidFieldType, InvalidDataType, InvalidValidatorType, 
    ValidatorTypeRequired, MinMaxRequired, ValidatorNotExist } = dataFieldMessages;
const { DataGroupNotExist } = dataGroupMessages;
const { PathNotExist } = pathMessages; 
const { UniNotExist } = uniMessages;


// @route   GET api/datafields/allowedTypes
// @desc    Get allowed types
// @access  Admin
router.get('/allowedTypes', [auth, authAdmin], (req, res, next) => {
    res.send(types);
})

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
        fieldType,
        dataType,
        pathId,
        groupId,
        uniId
    } = req.body;

    res.locals.model = modelName;

    // Check that field type is valid
    if(!allowedTypes.isType(fieldType, types.fieldTypes))
        return res.status(InvalidFieldType.status)
                  .send(InvalidFieldType.msg)

    // Check that data type is valid
    if(!allowedTypes.isType(dataType, types.dataTypes))
        return res.status(InvalidDataType.status)
                  .send(InvalidDataType.msg)

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
                        
                        University.findById(uniId)
                                  .then(uni => {
                                    if(!uni && uniId)
                                        return res.status(UniNotExist.status)
                                                  .send(UniNotExist.msg)
                                    
                                    const dataObj = types.dataTypes.find(type =>
                                        type.value === dataType)
                                    
                                    // Create new field
                                    const newField = new DataField({
                                        name: name,
                                        fieldType: fieldType,
                                        dataType: dataType,
                                        path: pathId,
                                        group: groupId,
                                        validators: {
                                            validType: dataObj.defVal
                                        },
                                        university: uniId 
                                    })

                                    newField.save()
                                            .then(field => {
                                                return res.send(field)
                                            })
                                            .catch(next); // Saving field
                                  })
                                  .catch(next); // Find university
                        })
                        .catch(next); // Find data group
        })
        .catch(next); // Find path
})
    

// @route   PUT api/datafields/:id
// @desc    Update data field
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        fieldType,
        groupId,
        uniId
    } = req.body;

    res.locals.model = modelName;

    const fieldId = req.params.id;


    // Check that field type is valid
    if(!allowedTypes.isType(fieldType, types.fieldTypes))
        return res.status(InvalidFieldType.status)
                  .send(InvalidFieldType.msg)
  
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
                            
                            University.findById(uniId)
                                      .then(uni => {
                                        if(!uni && uniId)
                                            return res.status(UniNotExist.status)
                                                      .send(UniNotExist.msg)
                                            
                                        field.name = name,
                                        field.fieldType = fieldType,
                                        field.group = groupId,
                                        field.uni = uniId

                                        field.save()
                                                .then(field => {
                                                    return res.send(field)
                                                })
                                                .catch(next); // Saving field
                                      })
                                      .catch(next);
                            })
                            .catch(next); // Find data field
                })
                .catch(next); // Find data group
});

// @route   PUT api/datafields/:id/addValid
// @desc    Add validator
// @access  Admin
router.put('/:id/addValid', [auth, authAdmin], (req, res, next) => {
    const { 
        validType,
        min,
        max
    } = req.body;

    res.locals.model = modelName;

    const fieldId = req.params.id;

    // Check that user entered a validator type
    if(!validType)
        return res.status(ValidatorTypeRequired.status)
                  .msg(ValidatorTypeRequired.msg)

    // Check that field type is valid
    if(!allowedTypes.isType(validType, types.validationTypes))
        return res.status(InvalidValidatorType.status)
                  .send(InvalidValidatorType.msg)
    
    if(validType === "numRange" && (!min || !max))
        return res.status(MinMaxRequired.status)
                  .send(MinMaxRequired.msg)

    DataField.findById(fieldId)
             .then(field => {
                if(!field)
                    return res.status(DataFieldNotExist.status)
                              .send(DataFieldNotExist.msg)
                
                const newValidator = {
                    validType: validType,
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
    if(!allowedTypes.isType(type, types.validationTypes))
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

    DataField.findById(fieldId)
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
