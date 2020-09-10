const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const Calculation = require('../../models/Calculation');
const DataField = require('../../models/DataField');
const Path = require('../../models/Path');
const University = require('../../models/University');
const modelName = 'calculation';

// Errors
const calcMessages = require('../../messages/calculations');
const dataFieldMessages = require('../../messages/data-fields');
const pathsMessages = require('../../messages/paths');
const uniMessages = require('../../messages/universities');

const { CalcNotExist, SuggestionRequired,
    StoredCalcNotExist, CalcSuccessDelete } = calcMessages;
const { DataFieldNotExist } = dataFieldMessages;
const { PathNotExist } = pathsMessages;
const { UniNotExist } = uniMessages;

import storedCalcs from '../../utils/calcsIndex';

// @route   GET api/calculations/:id
// @desc    Get calculation by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
    Calculation.findById(req.params.id)
                .then(calc => {
                    if(!calc) 
                        return res.status(CalcNotExist.status)
                                  .send(CalcNotExist.msg);
                    
                    return res.send(calc);
                })
                .catch(next);
})

// @route   GET api/calculations
// @desc    Get all calculations
// @access  Private
router.get('/', auth, (req, res, next) => { 
    Calculation.find()
               .then(calc => res.send(calc))
               .catch(next);
})
 
// @route   POST api/calculations
// @desc    Create new calculation
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name, 
        pathId,
        uniId,
        calcFieldsIds,
        outputFieldId,
        isSuggestion,
        storedCalcId
    } = req.body;

    res.locals.model = modelName;

    if(outputFieldId && typeof isSuggestion === "undefined")
        return res.status(SuggestionRequired.status)
                  .send(SuggestionRequired.msg)

    Path.findById(pathId)
        .then(path => {
            // Check that assigned path exists
            if(!path) 
                return res.status(PathNotExist.status).send(PathNotExist.msg)

            University.findById(uniId)
                      .then(uni => {
                        if(!uni && uniId)
                            return res.status(UniNotExist.status)
                                      .send(UniNotExist.msg)

                      DataField.findById(outputFieldId)
                               .then(field => {
                                   if(!field && outputFieldId)
                                        return res.status(DataFieldNotExist.status)
                                                  .send(DataFieldNotExist.msg)
                                    
                                    // Check that assigned calc is a stored procedure
                                    if(!storedCalcs.find(calc => calc.id === storedCalcId))
                                        return res.status(StoredCalcNotExist.status)
                                                  .then(StoredCalcNotExist.msg)

                                    // Create new calculation
                                    const newCalc = new Calculation({
                                        name: name,
                                        path: pathId,
                                        university: uniId,
                                        fields: calcFieldsIds,
                                        outputField: {
                                            field: outputFieldId,
                                            isSuggestion: isSuggestion
                                        },
                                        calc: storedCalcId
                                    })

                                    newCalc.save()
                                            .then(calc => {
                                                return res.json(calc)
                                            })
                                            .catch(next); // Save calc
                            })
                            .catch(next); // Find output data field
                      })
                      .catch(next); // Find parent university
        })
        .catch(next) // Find path
})

// @route   PUT api/calculations/:id
// @desc    Update calculation
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name, 
        calcFieldsIds,
        outputFieldId,
        isSuggestion,
        storedCalcId
    } = req.body;

    res.locals.model = modelName;

    const calcId = req.params.id;

    // If output field was assigned but suggestion was not specified
    if(outputFieldId && typeof isSuggestion === "undefined")
        return res.status(SuggestionRequired.status)
                  .send(SuggestionRequired.msg)

    Calculation.findById(calcId)
            .then(calc => {
            // Check that calculation exists
                if(!calc) 
                    return res.status(CalcNotExist.status)
                              .send(CalcNotExist.msg)

                DataField.findById(outputFieldId)
                         .then(field =>{
                            if(!field && outputFieldId)
                                return res.status(DataFieldNotExist.status)
                                          .send(DataFieldNotExist.msg)
                         
                            // Check that assigned calc is a stored procedure
                            if(!storedCalcs.find(calc => calc.id === storedCalcId))
                                return res.status(StoredCalcNotExist.status)
                                        .then(StoredCalcNotExist.msg)
                           
                            calc.name = name;
                            calc.fields = calcFieldsIds;
                            calc.outputField = {
                                field: outputFieldId,
                                isSuggestion: isSuggestion
                            };
                            calc.calc = storedCalcId

                            calc.save()
                                .then(calc => {
                                    return res.send(calc)              
                                })
                                .catch(next); // Save calc    
                        })
                        .catch(next); // Find output data field

            })
            .catch(next); // Find data group
});


// @route   DELETE api/calculations/:id
// @desc    Delete calculation
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const calcId = req.params.id;

    Calculation.findById(calcId)
              .then(calc => {
                if(!calc) 
                    return res.status(CalcNotExist.status)
                              .send(CalcNotExist.msg);

                // TODO: Do not allow deleting calc or fields if use in calc                            
                calc.remove()
                     .then(() => {
                        return res.send(CalcSuccessDelete.msg)
                     })
                     .catch(next);
            })
            .catch(next);
})

module.exports = router;
