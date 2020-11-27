const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const UserData = require('../../models/UserData');
const DataField = require('../../models/DataField');
const DataTable = require('../../models/DataTable');
const Path = require('../../models/Path');
const modelName = 'user data';

// Errors
const dataMessages = require('../../messages/user-data');
const fieldsMessages = require('../../messages/data-fields');
const pathsMessages = require('../../messages/paths');

import dataTablesMessages from '../../messages/data-tables';


const { SuccessDelete, UserDataAlreadyExist, DataNotExist,
    NoEnabledTable, UserDataNotInTable, ArgsInsuffice } = dataMessages;
const { DataTableNotExist, EnabledAlreadySwitched } = dataTablesMessages;    
const { DataFieldNotExist } = fieldsMessages;
const { PathNotExist } = pathsMessages;

import storedCalcs from '../../utils/stats/calcs/storedCalcs';
import executeCalc from '../../utils/stats/calcs/executeCalc';


const findLatestTable = tables => {
    return tables.sort((a, b) => 
        new Date(b.last_updated).getTime() - 
        new Date(a.last_updated).getTime())[0]
}

// @route   GET api/userdata/user
// @desc    Get one user data
// @access  Private
router.post('/user', auth, (req, res, next) => {
    const {
        tableId
    } = req.body;

    const userId = res.locals.user.id;

    UserData.findOne({ user: userId })
            .populate('tables.table')
            .then(data => {
                if(!data) 
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg);
                
                let tableData
                
                if(tableId)
                    tableData = data.tables.find(tableObj =>
                        tableObj.table._id.equals(tableId))
                
                else {
                    tableData = data.tables.find(tableObj => 
                        tableObj.enabled)
                    
                    if(!tableData)
                        tableData = findLatestTable(data.tables)
                }
    
                const obj = {
                    tableData,
                    transfer_suggested: data.transfer_suggested,
                    tables: data.tables.map(tableObj => tableObj.table)
                }
                return res.send(obj);
            })
            .catch(next)
})




// @route   GET api/userdata/:tableId/:pathId
// @desc    Get all users data by table and path
// @access  Private
router.get('/:tableId/:pathId', auth, (req, res, next) => { 
    const pathId = req.params.pathId;
    const tableId = req.params.tableId;

    DataTable.findById(tableId)
             .then(table => {
                 if(!table)
                    return res.status(DataTableNotExist.status)
                              .send(DataTableNotExist.msg)
                
                Path.findById(pathId)
                .then(path => {
                    if(!path)
                        return res.status(PathNotExist.status)
                                .send(PathNotExist.msg)
                         
                    UserData.find({ "tables.table": tableId })
                    .select("-user")
                    .then(dataItems => {
                        // Filter tables that are not the table requested
                        const tableUserData = dataItems.filter(item =>
                            item.tables.find(curTable => 
                                curTable.paths.includes(pathId) &&
                                curTable.enabled && curTable.dataVals))

                        const tableData = tableUserData.map(item => ({
                            _id: item._id,
                            dataVals: item.tables.find(curTable => 
                                curTable.table.equals(tableId)).dataVals
                        }))
                            
                        return res.send(tableData)
                    })
                    .catch(next);                  
                })
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

                DataTable.findOne({ enabled: true })
                         .then(table => {
                            if(!table)
                                return res.status(DataTableNotExist.status)
                                        .send(DataTableNotExist.msg)

                            // Create new user data entry
                            const newData = new UserData({
                                user: userId,
                                tables: [
                                    {
                                        table: table._id,
                                        paths: pathIds
                                    }
                                ]
                            })

                            newData.save()
                                    .then(data => {
                                        async function populateData() {
                                            await data.populate('tables.table')
                                            .execPopulate();
                
                                            return res.send(data); 
                                        }
                                        populateData();       
                                    })
                                    .catch(next); // Save data entry
                        }) 
                        .catch(next) // Find enabled data table 
                    })
            // Check that user data entry doesn't already exist
            .catch(next); 
})


// @route   Post api/userdata/simulateCalcs
// @desc    Simulate calculations
// @access  Private
router.post('/simulateCalcs', auth, (req, res, next) => {
    const {
        values,
        calcIds
    } = req.body

    // Find all stored calcs that should be executed
    const storCalcs = storedCalcs.filter(calc =>
        calcIds.includes(calc.id))
    
    let resultArray = []

    for(let calc of storCalcs) {
        let calcObj

        try {
            calcObj = executeCalc(calc, values)
        }

        catch(error) {
            return res.status(error.status).send(error.msg)
        }
       
        resultArray.push({
            calc,
            result: calcObj.value
        })
    }

    // Find relevant outputfield
    DataField.find({ calcOutput: { $exists: true }})
        .populate('calcOutput')
        .then(fields => {
            resultArray = resultArray.map(item => ({
                field: fields.find(field => 
                    field.calcOutput.storedCalc === item.calc.id),
                result: item.result
            }))

            return res.send(resultArray)
        })
        .catch(next)    
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
            .populate('tables.table')
            .select('_id enabled')
            .then(data => {
            // Check that group exists
                if(!data) 
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)
                                
                // Find the enabled table             
                const dataTable = data.tables.find(table => 
                    table.table.enabled)              
                dataTable.paths = pathIds

                data.save()
                    .then(data => {
                        async function populateData() {
                            await data.populate('tables.table')
                            .execPopulate();

                            const editedTable = data.tables.find(table => 
                                table.table.enabled)
                            return res.send({
                                table: editedTable.table,
                                paths: editedTable.paths
                            }); 
                        }
                        populateData();              
                    })
                    .catch(next); // Save user data
            })
            .catch(next); // Find user data
});

// @route   PUT api/userdata/switchtable
// @desc    Switch user active table to be the enabled table
// @access  Private
router.put('/switchtable', auth, (req, res, next) => {
    res.locals.model = modelName;
    const userId = res.locals.user.id;

    UserData.findOne({ user: userId })
            .populate('tables.table')
            .select('_id enabled')
            .then(data => {
                if(!data)
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)
                
                // Check that user has not already switched to enabled table
                if(data.tables.find(table => table.enabled))
                    return res.status(EnabledAlreadySwitched.status)
                              .send(EnabledAlreadySwitched.msg)
                
                DataTable.findOne({ enabled: true })
                         .then(table => {
                            if(!table)
                                return res.status(DataTableNotExist.status)
                                          .send(DataTableNotExist.msg)
                            
                            // Get the table with the latest record
                            const latestRecord = data.tables.reduce((max, table) =>
                                table.last_updated > max ? table.last_updated : max,
                                data.tables[0].last_updated)

                            // Compose a new table object and push to tables array   
                            data.tables.push({
                                ...latestRecord,
                                table: table._id,
                            })

                            data.transfer_suggested = false;

                            async function populateData() {
                                await data
                                .populate('tables.paths')
                                .execPopulate();
                            
                                return res.send(data.tables.find(curTable => 
                                    curTable.table._id === table._id))
                                }

                            populateData();
                         })
                         .catch(next); // Find enabled table
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
            .populate('tables.table')
            .then(data => {
                if(!data)
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)
                
                const enabledTable = data.tables.find(curTable => curTable.table.enabled)

                if(!enabledTable)
                    return res.status(NoEnabledTable.status)
                              .send(NoEnabledTable.msg)
                    
                DataField.findById(fieldId)
                         .then(field => {
                            if(!field)
                                return res.status(DataFieldNotExist.status)
                                          .send(DataFieldNotExist.msg)

                            const values = enabledTable.dataVals
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
                                values.push({
                                    field: fieldId,
                                    value
                                })
                            }

                            enabledTable.last_updated = Date.now();

                            data.save()
                                .then(data => {
                                    async function populateData() {
                                        await data
                                        .populate('tables.table')
                                        .execPopulate();
                                        const valueObj = data.tables.find(curTable => 
                                            curTable.table.enabled)
                                            .dataVals.find(val => 
                                                val.field._id.equals(fieldId))
                                        return res.send(valueObj); 
                                    }
                                    populateData();
                                })
                                .catch(next); // Save user data
                         })
                         .catch(next); // Find data field
            })
            .catch(next); // Find user data
})

// @route   PUT api/calculations/execCalc
// @desc    Execute calculation
// @access  Private
router.put('/execCalc', auth, (req, res, next) => {
    const {
        calcsToExec
    } = req.body

    const userId = res.locals.user.id;

    UserData.findOne({ user: userId })
    .populate('tables.table')
    .then(data => {
        if(!data)
            return {
                status: DataNotExist.status,
                msg: DataNotExist.msg
            }
            
        const enabledTable = data.tables.find(curTable => 
            curTable.table.enabled) 
        let values = enabledTable.dataVals

        // Assign calc value to the relevant field
        DataField.find({ calcOutput: { $exists: true }})
        .populate('calcOutput')
        .then(async(fields) => {

            let newCalcs = []
            for(let calcLevel of calcsToExec) {
                for(let storCalcId of calcLevel) {
                    const storCalc = storedCalcs.find(calc => 
                        calc.id === storCalcId)
                    
                    let calcObj = {}

                    try {
                        calcObj = await executeCalc(storCalc, values)
                    }
            
                    catch(err) {
                        return res.status(err.status).send(err.msg)
                    }

                    const field = fields.find(thisField => 
                        thisField.calcOutput.storedCalc === storCalcId)
                    
                    const fieldId = field._id
                    const calcOutput = field.calcOutput
                
                    const payload = calcObj.payload

                    const dataVal = values.find(val => 
                        val.field.equals(fieldId))

                    // If the user already has a value for the field
                    if(dataVal) {
                        if(!calcOutput.isSuggestion) {
                            dataVal.value = calcObj.value;
                        }

                        else {
                            dataVal.suggestValue = calcObj.value;
                        }

                        dataVal.payload = payload ? payload : {}
                    }
                    
                    // If the field is yet to have a value
                    else {
                        if(!calcOutput.isSuggestion) {
                            values.push({
                                field: fieldId,
                                value: calcObj.value,
                                payload: payload ? payload : {}
                            })
                        }
    
                        else {
                            values.push({
                                field: fieldId,
                                suggestValue: calcObj.value,
                                payload: payload ? payload : {}
                            })
                        }
                    }
                    await data.save()
                        .then(async(data) => {
                            async function populateAndGroup() {
                                await data
                                    .populate("tables.table.field")
                                    .populate("tables.dataVals.field")
                                    .execPopulate();
                                values = data.tables.find(curTable => 
                                    curTable.table.enabled).dataVals
                                const newValue = values.find(val => 
                                    val.field._id.equals(fieldId))
               
                                newCalcs.push(Object.assign(
                                    newValue, 
                                    { payload: calcObj.payload }
                                ))
                            }

                            await populateAndGroup()
                        })
                        .catch(next);
                    }
            }
            return res.send(newCalcs)
        })
        .catch(next);
    })
    .catch(next)
})



// @route   PUT api/userdata/toggleEnabled
// @desc    Toggle data enabled status
// @access  Admin
router.put('/toggleEnabled/:tableId', auth, (req, res, next) => {

    const userId = res.locals.user.id
    const tableId = req.params.tableId

    UserData.findOne({ user: userId })
            .then(data => {
                if(!data)
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)
                    
                DataTable.findById(tableId)
                         .then(table => {
                             if(!table)
                                return res.status(DataTableNotExist.status)
                                          .send(DataTableNotExist.msg)

                            const userTable = data.tables.find(curTable => 
                            curTable.table.equals(tableId))
        
                            if(!userTable)
                                return res.status(UserDataNotInTable.status)
                                          .send(UserDataNotInTable.msg)

                            userTable.enabled = !userTable.enabled
            
                            data.save()
                                .then(() => {
                                    return res.send(userTable)
                                })
                                .catch(next); // Save data
                            
                            })
                            .catch(next) // Find data table
            })
            .catch(next); // Find user data
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
