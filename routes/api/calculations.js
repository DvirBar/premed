const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
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

const { CalcNotExist, calcsNotFound, fieldsNotFound, calcSuccessDelete } = calcMessages;
const { DataFieldNotExist } = dataFieldMessages;
const { PathNotExist } = pathsMessages;
const { UniNotExist } = uniMessages;

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
        prevCalIds,
        fieldIds,
        calc,
        isExternal
    } = req.body;

    res.locals.model = modelName;

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

                        Calculation.count({ 
                            _id: { $in: [
                                prevCalIds.map(id =>
                                    ObjectId(id))
                            ]}
                        })
                        .then(count => {
                            if(count !== prevCalIds.length)
                                return res.status(calcsNotFound.status)
                                          .send(calcsNotFound.msg)

                            DataField.count({
                                _id: { $in: [
                                    fieldIds.map(id =>
                                        ObjectId(id))
                                ]}
                            })
                            .then(count => {
                                if(count !== prevCalIds.length)
                                    return res.status(fieldsNotFound.status)
                                              .send(fieldsNotFound.msg)
                                              
                                  // Create new calculation
                                  const newCalc = new Calculation({
                                      name: name,
                                      path: pathId,
                                      university: uniId,
                                      prevCals: prevCalIds,
                                      fields: fieldIds,
                                      calc: calc,
                                      isExternal: isExternal
                                  })
          
                                  newCalc.save()
                                          .then(calc => {
                                              return res.json(calc)
                                          })
                                          .catch(next); // Save calc
                            })
                            .catch(next); // Find all used fields
                        })
                        .catch(next); // Find all previous calculations
                      })
                      .catch(next); // Find parent data group
        })
        .catch(next) // Find path
})

// @route   PUT api/calculations/:id
// @desc    Update calculation
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name, 
        prevCalIds,
        fieldIds,
        calc,
        isExternal
    } = req.body;

    res.locals.model = modelName;

    const calcId = req.params.id;

    Calculation.findById(calcId)
            .then(calc => {
            // Check that calculation exists
                if(!calc) 
                    return res.status(CalcNotExist.status)
                              .send(CalcNotExist.msg)

                    Calculation.count({ 
                        _id: { $in: [
                            prevCalIds.map(id =>
                                ObjectId(id))
                        ]}
                    })
                    .then(count => {
                        if(count !== prevCalIds.length)
                            return res.status(calcsNotFound.status)
                                        .send(calcsNotFound.msg)

                        DataField.count({
                            _id: { $in: [
                                fieldIds.map(id =>
                                    ObjectId(id))
                            ]}
                        })
                        .then(count => {
                            if(count !== prevCalIds.length)
                                return res.status(fieldsNotFound.status)
                                          .send(fieldsNotFound.msg)
                                
                                calc.name = name;
                                calc.prevCals = prevCalIds;
                                calc.fields = fieldIds;
                                calc.calc = calc;
                                calc.isExternal = isExternal;

                                calc.save()
                                    .then(calc => {
                                        return res.send(calc)              
                                    })
                                    .catch(calc); // Save calc
                        })
                        .catch(next); // Find used fields
                    })
                    .catch(next); // Find previous calculations
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
                        return res.send(calcSuccessDelete.msg)
                     })
                     .catch(next);
            })
            .catch(next);
})

module.exports = router;
