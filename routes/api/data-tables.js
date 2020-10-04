import express from 'express';
const router = express.Router();
import auth from '../../middleware/auth';
import authAdmin from '../../middleware/authAdmin'

// Models
const DataTable = require('../../models/DataTable');

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
             .then(table => {
                if(!table) 
                    return res.status(DataTableNotExist.status)
                              .msg(DataTableNotExist.msg);


                // Disable formerly enabled table
                if(!table.enabled) {
                    DataTable.findOne({ $and: [{enabled: true}, {_id: {$ne: tableId}}] })
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
