import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth';
import authAdmin from '../../middleware/authAdmin'

// Models
const DataTable = require('../../models/DataTable');

// Google API
import { createSheet, renameSheet } from '../../utils/googleSheetsApi';

// Errors
import dataTablesMessages from '../../messages/data-tables';

const { DataTableSuccessDelete, UnlockDisabledTable,
     DataTableNotExist } = dataTablesMessages;


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

// @route   GET api/datafield
// @desc    Get all data field
// @access  Private
router.get('/', auth, (req, res, next) => { 
    DataTable.find()
        .then(table => res.send(table))
        .catch(next);
})
 
// @route   POST api/datatables
// @desc    Create new data table
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name, 
        year
    } = req.body;

    // Create spreadsheet
    createSheet(name)
        .then(sheetId => {
            // Create new data table
            const newTable = new DataTable({
                name: name,
                year: year,
                sheetId: sheetId
            })

            newTable.save()
                    .then(table => {
                        // TODO: return message that the 
                        return res.send(table)
                    })
                    .catch(next); // Save group
        })
        .catch(next); // Create sheet
})

// @route   PUT api/datafields/:id/rename
// @desc    Rename data table
// @access  Admin
router.put('/:id/rename', [auth, authAdmin], (req, res, next) => {
    const { 
        name
    } = req.body;

    const tableId = req.params.id;

    DataTable.findById(tableId)
             .then(table => {
                 if(!table)
                    return res.status(DataTableNotExist.status)
                              .send(DataTableNotExist.msg)
                    
                renameSheet(name)
                    .then(msg => {
                        table.name = name;

                        table.save()
                             .then(table => {
                                const resObj= {
                                    msg,
                                    table
                                }

                                return res.send(resObj)
                             })
                    })
                    .catch(next);
             })
            .catch(next)
});

// @route   PUT api/datafields/:id/toggleEnable
// @desc    Rename data table
// @access  Admin
router.put('/:id/toggleEnable', [auth, authAdmin], (req, res, next) => {
    const tableId = req.params.id;

    DataTable.findById(tableId)
             .then(table => {
                if(!table) 
                    return res.status(DataTableNotExist.status)
                              .msg(DataTableNotExist.msg);


                // Disable formerly enabled table
                if(!table.enabled) {
                    DataTable.findOne({ enabled: true })
                    .then(enabledTable => {
                        if(enabledTable) {
                            enabledTable.enbaled = false
                            
                            enabledTable.save()
                                .then(() => {
                                    table.enabled = true;
                                    table.save()
                                         .then(table => {
                                             return res.send(table)
                                         })
                                         .catch(next); // Save table
                                })
                                .catch(next) // Save formerly enabled table
                        }

                        table.enabled = true;
                        table.save()
                             .then(table => {
                                 return res.send(table)
                             })
                             .catch(next) // Save table
                    })
                    .catch(next); // Save formerly enabled table
                }
                
                table.enabled = false; 
                table.save()
                     .then(table => {
                         return res.send(table)
                     })
                     .catch(next); // Save table
             })
             .catch(next); // Find table to toggle enabled status
});

// @route   PUT api/datafields/:id/toggleLock
// @desc    Rename data table
// @access  Admin
router.put('/:id/toggleLock', [auth, authAdmin], (req, res, next) => {
    const tableId = req.params.id;

    DataTable.findById(tableId)
             .then(table => {
                if(!table) 
                    return res.status(DataTableNotExist.status)
                              .msg(DataTableNotExist.msg);

                // If table is locked, unlock it
                if(table.locked) {
                    // If table is to be unlocked but is enabled
                    if(!table.enabled) 
                        return res.status(UnlockDisabledTable.status)
                                  .send(UnlockDisabledTable.msg)
                    
                    table.locked = false;
                    table.save()
                         .then(table => {
                             return res.send(table)
                         })
                         .catch(next); // Save table
                }

                // If table is unlocked, lock it
                table.locked = true;
                table.save()
                     .then(table =>{
                         return res.send(table)
                     })
                     .catch(next); // Save table
             })
             .catch(next); // Find table to toggle locked status
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
