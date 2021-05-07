import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth';
import authAdmin from '../../middleware/authAdmin'

// Models
const DataTable = require('../../models/DataTable');

// Errors
import dataTablesMessages from '../../messages/data-tables';
import findClosestDates from '../../utils/datesService';

const { DataTableSuccessDelete, ThresholdSuccessDelete, 
     InvalidThreshType, InvalidRejectValue, InvalidAcceptValue,
      DataTableNotExist, ThresholdNotExist } = dataTablesMessages;


const validateDateValues = (closestDates, thresholds, threshType, value) => {
    if(closestDates.later) {
        const laterThresh = thresholds.find(thresh =>
            new Date(thresh.date).getTime() === closestDates.later.getTime())

        if(threshType === 'accept' && laterThresh
        && laterThresh.value > value) {
            throw InvalidAcceptValue
        }

        else if(threshType === 'reject' && laterThresh
        && laterThresh.value < value) {
            throw InvalidRejectValue
        } 
    }

    if(closestDates.earlier) {
        const earlierThresh = thresholds.find(thresh =>
            new Date(thresh.date).getTime() === closestDates.earlier.getTime())

        if(threshType === 'accept' && earlierThresh
        && earlierThresh.value < value) {
            throw InvalidAcceptValue
        }

        else if(threshType === 'reject' && earlierThresh
        && earlierThresh.value > value) {
            throw InvalidRejectValue
        } 
    }
}

// @route   GET api/datatables/:id
// @desc    Get data table by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
    DataTable.findById(req.params.id)
            .then(table => {
                if(!table) 
                    return res.status(DataTableNotExist.status)
                              .send(DataTableNotExist.msg);
                
                return res.send(table);
            })
            .catch(next)
})

// @route   GET api/dataTable
// @desc    Get all data tables
// @access  Private
router.get('/', auth, (req, res, next) => { 
    DataTable.find()
            .sort({ date_created: -1 })
            .then(table => res.send(table))
            .catch(next);
})
 
// @route   POST api/datatables
// @desc    Create new data table
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name, 
        tableUrl
    } = req.body;

    // Create new data table
    const newTable = new DataTable({
        name: name,
        url: tableUrl
    })

    newTable.save()
            .then(table => {
                return res.send(table)
            })
            .catch(next); // Save table
})

// @route   PUT api/datatables/:id/rename
// @desc    Edit data table
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        tableUrl
    } = req.body;

    const tableId = req.params.id;

    DataTable.findById(tableId)
             .then(table => {
                 if(!table)
                    return res.status(DataTableNotExist.status)
                              .send(DataTableNotExist.msg)
                    
                table.name = name;
                table.url = tableUrl;
                if(tableUrl) {
                    table.enabled = false
                }

                table.save()
                     .then(table => {
                        return res.send(table)
                     })
                     .catch(next);
                })
             .catch(next)
});

// @route   PUT api/datatables/:id/toggleEnabled
// @desc    Toggle enabled status
// @access  Admin
router.put('/:id/toggleEnabled', [auth, authAdmin], (req, res, next) => {
    const tableId = req.params.id;

    DataTable.findById(tableId)
             .populate('thresholds.field')
             .then(table => {
                if(!table) 
                    return res.status(DataTableNotExist.status)
                              .msg(DataTableNotExist.msg);


                // Disable formerly enabled table
                if(!table.enabled) {
                    DataTable.findOne({ $and: [{enabled: true}, {_id: {$ne: tableId}}] })
                    .populate('thresholds.field')
                    .then(disabledTable => {
                        if(disabledTable) {
                            disabledTable.enabled = false
                            
                            disabledTable.save()
                                .then(disabledTable => {
                                    table.enabled = true;
                                    table.save()
                                         .then(table => {
                                             return res.status(200).send([
                                                    disabledTable,
                                                    table
                                             ])
                                         })
                                         .catch(next); // Save table
                                })
                                .catch(next) // Save formerly enabled table
                        }

                        else {
                            table.enabled = true;
                            table.save()
                                .then(table => {
                                    return res.send([table])
                                })
                                .catch(next) // Save table
                        }
                    })
                    .catch(next); // Save formerly enabled table
                }
                else {
                    table.enabled = false; 
                    table.save()
                         .then(table => {
                             return res.send(table)
                         })
                         .catch(next); // Save table
                }
             })
             .catch(next); // Find table to toggle enabled status
});

// @route   PUT api/datatables/:id/addThreshold
// @desc    Add threshold
// @access  Admin
router.put('/:id/addThreshold', [auth, authAdmin], (req, res, next) => {
    const {
        threshType,
        date,
        isFinal,
        fieldId,
        value
    } = req.body
    
    if(threshType !== 'reject' && threshType !== 'accept') {
        return res.status(InvalidThreshType.status)
                  .send(InvalidThreshType.msg)     
    }

    const tableId = req.params.id;

    DataTable.findById(tableId)
             .then(table => {
                if(!table)
                    return res.status(DataTableNotExist.status)
                              .send(DataTableNotExist.msg)

                const thresholds = table.thresholds
                const fieldThresholds = thresholds.filter(thresh =>
                    thresh.field === fieldId && 
                    thresh.threshType === threshType) 

                if(fieldThresholds.length !== 1) {
                    const closestDates = findClosestDates(
                        date,
                        fieldThresholds.map(thresh => thresh.date))

                    try {
                        validateDateValues(closestDates, fieldThresholds, threshType, value)
                    }

                    catch(err) {
                        return res.status(err.status).send(err.msg)
                    }

                    /* If field is set to final, check that it is the only one.
                    if not, set the other isFinal to false */
                    if(isFinal) {
                        const formerFinal = fieldThresholds.find(thresh => 
                            thresh.isFinal 
                            && thresh.threshType === threshType)
    
                        if(formerFinal)
                            formerFinal.isFinal = false
                    }
                }

                const newThreshold = {
                    threshType,
                    date,
                    isFinal,
                    field: fieldId,
                    value
                }

                thresholds.push(newThreshold)

                table.save()
                    .then(() => {
                        return res.send(thresholds)
                    })
                    .catch(next)
             })
             .catch(next)
})


// @route   PUT api/datatables/:id/:threshId
// @desc    Edit threshold
// @access  Admin
router.put('/:id/:threshId', [auth, authAdmin], (req, res, next) => {
    const {
        threshType,
        date,
        isFinal,
        value
    } = req.body
    
    if(threshType !== 'reject' && threshType !== 'accept') {
        return res.status(InvalidThreshType.status)
                  .send(InvalidThreshType.msg)     
    }

    const tableId = req.params.id;
    const threshId = req.params.threshId

    DataTable.findById(tableId)
             .then(table => {
                if(!table)
                    return res.status(DataTableNotExist.status)
                              .send(DataTableNotExist.msg)

                const thresholds = table.thresholds
                const editThresh = thresholds.id(threshId)
                
                const fieldThresholds = thresholds.filter(thresh =>
                    thresh.field._id === editThresh.field._id && 
                    thresh._id !== threshId)
                
                if(fieldThresholds.length > 1) {
                    // Validate date-value consistency only if value or date has changed
                    if (value !== editThresh.value 
                    || new Date(date).getTime() !== new Date(editThresh.date).getTime()) {
                        
                        const closestDates = findClosestDates(
                            date,
                            fieldThresholds.map(thresh => thresh.date)
                        )
                        
                        try {
                            validateDateValues(closestDates, fieldThresholds, threshType, value)
                        }
    
                        catch(err) {
                            return res.status(err.status).send(err.msg)
                        }
                    }
                    
                    /* If field is set to final, check that it is the 
                    only one. if not, set the other isFinal to false */
                    if(isFinal) {
                        const formerFinal = fieldThresholds.find(thresh => 
                            thresh.isFinal 
                            && thresh._id !== threshId 
                            && thresh.threshType === threshType)
    
                        if(formerFinal)
                            formerFinal.isFinal = false
                    }
                }
                
                editThresh.set({
                    ...editThresh,
                    threshType,
                    date,
                    isFinal,
                    value
                })

                table.save()
                    .then(() => {
                        return res.send(fieldThresholds)
                    })
                    .catch(next)
             })
             .catch(next)
})


// @route   PUT api/datatables/:id/:threshId
// @desc    Remove threshold
// @access  Admin
router.put('/:id/:threshId/remove', [auth, authAdmin], (req, res, next) => {
    const tableId = req.params.id;
    const threshId = req.params.threshId

    DataTable.findById(tableId)
             .then(table => {
                if(!table)
                    return res.status(DataTableNotExist.status)
                              .send(DataTableNotExist.msg)

                const delThresh = table.thresholds.id(threshId)

                if(!delThresh) 
                    return res.status(ThresholdNotExist.status)
                              .send(ThresholdNotExist.msg)

                delThresh.remove()

                table.save()
                    .then(() => {
                        return res.status(ThresholdSuccessDelete.status)
                                .send(ThresholdSuccessDelete.msg)
                    })
                    .catch(next)

            })
            .catch(next)
})


// @route   DELETE api/datatables/:id
// @desc    Delete data table
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const tableId = req.params.id;

    DataTable.findById(tableId)
              .then(table => {
                if(!table) 
                    return res.status(DataTableNotExist.status)
                              .send(DataTableNotExist.msg);

                // TODO: Transfer related user data to another table                        
                table.remove()
                    .then(() => {
                        return res.send(DataTableSuccessDelete.msg)
                    })
                    .catch(next);
            })
            .catch(next);
})

module.exports = router;
