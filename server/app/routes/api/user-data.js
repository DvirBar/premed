const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const UserData = require('../../models/UserData');
const DataTable = require('../../src/api/components/dataTables/db/model');
import groups from '../../utils/stats/groups/dataGroups';
const modelName = 'user data';

// Errors
const dataMessages = require('../../messages/user-data');
const pathsMessages = require('../../messages/paths');

import dataTablesMessages from '../../messages/data-tables';
import storedCalcs from '../../utils/stats/calcs/storedCalcs';

/* TODO: Check imports and finish data insert */

import { populatePaths } from '../../utils/internalData';


const { SuccessDelete, ValuesDeleteSuccess, UserDataAlreadyExist, 
    DataNotExist, NoEnabledTable, UserDataNotInTable, 
    ReqDataNotExist, CustomGroupNotExist } = dataMessages;
const { DataTableNotExist, EnabledAlreadySwitched } = dataTablesMessages;    
const { PathNotExist } = pathsMessages;

import executeCalc from '../../utils/stats/calcs/executeCalc/executeCalc';


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
                    tableData: {
                        ...tableData.toObject(),
                        paths: populatePaths(tableData.paths)
                    },
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
 
// @route   POST api/userdata
// @desc    Create user data entry
// @access  Private
router.post('/', auth, (req, res, next) => {
    const { 
        pathIds,
        enabled,
        defaults
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
                                        paths: pathIds,
                                        enabled,
                                        dataVals: defaults
                                    }
                                ]
                            })

                            newData.save()
                                    .then(data => {
                                        async function populateData() {
                                            await data.populate('tables.table')
                                            .execPopulate();
                                            const obj = {
                                                data: {
                                                    tableData: {
                                                        ...data.tables[0].toObject(),
                                                        paths: populatePaths(data.tables[0].paths)
                                                    },
                                                    transfer_suggested: false,
                                                    tables: data.tables.map(tableObj => tableObj.table)
                                                },
                                                selTable: table._id
                                            }
                
                                            return res.send(obj); 
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


// @route   POST api/userdata/simulateCalcs
// @desc    Simulate calculations
// @access  Private
router.post('/simulateCalcs/:tableId', auth, async(req, res, next) => {
    const {
        values,
        calcsToExec,
        customGroups,
        tableYear
    } = req.body
    
    let resultArray = []
    let stagedValues = values


    for(let calcLevel of calcsToExec) {
        for(let storCalcId of calcLevel) {
            const storCalc = storedCalcs.find(calc => 
                calc._id === storCalcId)

            const calcVersions = storCalc.versions
            const yearToExec = calcVersions?.includes(tableYear) 
            ? tableYear : tableYear - 1 
            if(!calcVersions 
            || calcVersions?.includes(yearToExec)) {
                    let calcObj = {}

                try {
                    calcObj = await executeCalc(
                        storCalc, 
                        stagedValues,  
                        customGroups,
                        yearToExec)
                }
        
                catch(err) {
                    return res.status(err.status || 500).send(err.msg)
                }

                const resultObj = {
                    ...calcObj,
                    isCalc: true,
                    field: storCalcId
                }

                stagedValues = stagedValues.map(val => {
                    if(val.field === resultObj.field) {
                        val.value = resultObj.value
                    }

                    return val
                })

                resultArray.push(resultObj) 
            }
        }
    }

    res.status(200).send(resultArray)                                 
})


// @route   PUT api/userdata/editpaths/:tableId
// @desc    Update data group
// @access  Private
router.put('/editpaths/:tableId', auth, (req, res, next) => {
    const {
        pathIds
    } = req.body;

    const tableId = req.params.tableId
    res.locals.model = modelName;

    const userId = res.locals.user.id;

    UserData.findOne({ user: userId })
            .then(data => {
            // Check that group exists
                if(!data) 
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)

                // Find the enabled table             
                const dataTable = data.tables.find(tableObj => 
                    tableObj.table.equals(tableId))     

                dataTable.paths = pathIds

                data.save()
                    .then(data => {
                        async function populateData() {
                            await data.populate('tables.table')
                            .execPopulate();

                            const editedTable = data.tables.find(tableObj => 
                                tableObj.table._id.equals(tableId))
                            return res.send(populatePaths(editedTable.paths)) 
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


// @route   PUT api/userdata/insertdata/:tableId
// @desc    Insert data 
// @access  Private
router.put('/insertdata/:tableId', auth, (req, res, next) => {
    const {
        fieldId,
        groupId,
        isCalc,
        cusGroupParent,
        value,
        suggestedAccepted
    } = req.body;

    const tableId = req.params.tableId
    const userId = res.locals.user.id
    
    UserData.findOne({ user: userId })
            .populate('tables.table')
            .then(data => {
                if(!data)
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)
                
                const enabledTable = data.tables.find(curTable => 
                    curTable.table.enabled && curTable.table._id.equals(tableId))

                if(!enabledTable)
                    return res.status(NoEnabledTable.status)
                              .send(NoEnabledTable.msg)
                    
                
                const values = enabledTable.dataVals
                let found = false
                            
            // If the user already has a value for the field
                for(let item of values) {
                    if(item.field === fieldId && item.group === groupId) {
                        item.value = value;
                        found = true;
                        if(suggestedAccepted) {
                            item.suggestedAccepted = true
                        }

                        break;
                    }
                }

            // If the field is yet to have a value
                if(!found) {
                    let isType
                    if(groupId) {
                        const groupField = groups.find(group =>
                            cusGroupParent 
                            ?  group._id === cusGroupParent
                            :  group._id === groupId).fields.find(field =>
                                fieldId === field._id)

                        if(groupField.isType) {
                            isType = true
                        }
                    }

                    let newVal = {
                        field: fieldId,
                        group: groupId,
                        isCalc,
                        cusGroupParent,
                        isType,
                        value
                    }

                    if(suggestedAccepted) {
                        newVal.suggestedAccepted = true
                    }

                    values.push(newVal)
                }

                enabledTable.last_updated = Date.now();

                data.save()
                    .then(data => {
                        const valueObj = data.tables.find(curTable => 
                            curTable.table.enabled)
                            .dataVals.find(val => 
                                val.field === fieldId && 
                                val.group === groupId)
                        return res.send(valueObj); 
                    })
                    .catch(next); // Save user data
            })
            .catch(next); // Find user data
})

// @route   PUT api/userdata/removedata/:tableId
// @desc    Remove data 
// @access  Private
router.put('/removedata/:tableId', auth, (req, res, next) => { 
    const {
        fieldId,
        groupId,
        cusGroupParent,
        removeAll
    } = req.body

    const tableId = req.params.tableId
    const userId = res.locals.user.id
    
    UserData.findOne({ user: userId })
            .populate('tables.table')
            .then(async(data) => {
                // Return ERROR(404) if data for user wasn't found
                if(!data)
                    return res.status(DataNotExist.status)
                              .send(DataNotExist.msg)

                // Get requested table and enabled table
                const enabledTable = data.tables.find(curTable => 
                    curTable.table.enabled && 
                    curTable.table._id.equals(tableId))

                // Return ERROR(404) if no table for the user was found
                if(!enabledTable)
                    return res.status(UserDataNotInTable.status)
                              .send(UserDataNotInTable.msg)

                const values = enabledTable.dataVals
                
                /* If removeAll is true, remove all values associated 
                with group ID */
                if(removeAll) {
                    const valueIdsToRemove = values.filter(val => 
                        val.group === groupId).map(val => val._id)

                    if(valueIdsToRemove.length === 0 && !cusGroupParent)
                        return res.status(ReqDataNotExist.status)
                                  .send(ReqDataNotExist.msg)

                    for(let valId of valueIdsToRemove) {
                        values.id(valId).remove()
                    }
                    
                    // If group is custom, remove custom group
                    if(cusGroupParent) {
                        const groupToDel = enabledTable.customGroups.find(group =>
                            group._id.equals(groupId))

                        if(!groupToDel)
                            return res.status(cusGroupParent.status)
                                      .send(cusGroupParent.msg)

                        groupToDel.remove()
                    }
                }

                else if(fieldId) {
                    const valueToRemove = values.find(val => 
                        val.group === groupId && val.field === fieldId)

                    if(!valueToRemove)
                        return res.status(ReqDataNotExist.status)
                                .send(ReqDataNotExist.msg)
                    
                    valueToRemove.remove()    
                }

                data.save()
                    .then(() => {
                        return res.status(ValuesDeleteSuccess.status)
                                  .send(ValuesDeleteSuccess.msg)
                    })
                    .catch(next) // Save data
            })
            .catch(next) // Find user data
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
    .then(async(data) => {
        if(!data)
            return res.status(DataNotExist.status)
                      .send(DataNotExist.msg)
        
        const enabledTable = data.tables.find(curTable => 
            curTable.table.enabled) 
        let values = enabledTable.dataVals
        const year = enabledTable.table.year
    
        let newCalcs = []
        for(let calcLevel of calcsToExec) {
            for(let storCalcId of calcLevel) {
                // Find stored calc
                const storCalc = storedCalcs.find(calc => 
                    calc._id === storCalcId)

                const calcVersions = storCalc.versions
                
                if(!calcVersions || calcVersions.includes(year)) {
                        let calcObj = {}

                    try {
                        calcObj = await executeCalc(
                            storCalc, 
                            values,  
                            enabledTable.customGroups,
                            year)
                    }
            
                    catch(err) {
                        console.log(err);
                        return res.status(err.status || 500).send(err.msg)
                    }
                    
                    const payload = calcObj.payload

                    const dataVal = values.find(val => 
                        val.field === storCalcId)

                    // If the user already has a value for the field
                    if(dataVal) {
                        if(!storCalc.isSuggestion) {
                            dataVal.value = calcObj.value;
                        }

                        else {
                            if(dataVal.suggestValue &&
                            Number(dataVal.suggestValue) !== 
                            Number(calcObj.value)) {
                                dataVal.suggestedAccepted = false
                            }

                            dataVal.suggestValue = calcObj.value;    
                        }

                        dataVal.payload = payload ? payload : {}
                    }
                    
                    // If the field is yet to have a value
                    else {
                        const isSuggestion = storCalc.isSuggestion
                        let valObj = {
                            field: storCalcId,
                            isCalc: true,
                            payload: payload ? payload : {}
                        }

                        if(!isSuggestion)
                            valObj.value = calcObj.value

                        else {
                            valObj.suggestValue = calcObj.value
                            valObj.suggestedAccepted = false
                        }
                            
                        values.push(valObj)
                    }
                    await data.save()
                        .then(async(data) => {
                            async function populateAndGroup() {
                                await data
                                    .populate("tables.table")
                                    .execPopulate();
                                values = data.tables.find(curTable => 
                                    curTable.table.enabled).dataVals
                                const newValue = values.find(val => 
                                    val.field === storCalcId)
                
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
        }
        return res.send(newCalcs)
    })
    .catch(next)
})



// @route   PUT api/userdata/toggleEnabled
// @desc    Toggle data enabled status
// @access  Private
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

// @route   PUT api/userdata/addCustomGroup
// @desc    Add new custom groups
// @access  Private
router.put('/addCustomGroup/:tableId', auth, (req, res, next) => {
    const {
        name,
        group
    } = req.body

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

                    const customGroup = {
                        name,
                        cusGroupParent: group
                    }

                    const customGroups = userTable.customGroups

                    customGroups.push(customGroup)
                    userTable.last_updated = Date.now();

                    data.save()
                        .then(() => {
                            return res.send(customGroups)
                        })
                        .catch(next)
                })
                .catch(next)
            })
            .catch(next) 
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

// async function executeCalcs({
//     storCalc, 
//     values,  
//     customGroups,
//     thisTable,
//     lastYearTable
// }) {
//     let yearsToExec = []
 
//     if(storCalc.versions) {
//         yearsToExec = storCalc.versions.filter(verYear => 
//             verYear === thisTable.year || 
//             verYear === lastYearTable.year)
//     }

//     else {
//         yearsToExec = [thisTable.year]
//     }

//     let mainCalcObj = {}
//     let otherCalcObj = {}
//     for(let year of yearsToExec) {
//         const {
//             result: calcObj,
//             params
//         } = await executeCalc(
//             storCalc, 
//             values,  
//             customGroups,
//             year)

//         if(storCalc.reverseCalcs) {
//             const thresholdsToUse = thisTable.year === year 
//             ? thisTable.thresholds : lastYearTable.thresholds
//             const revCalcs = []
//             for(revCalc of storCalc.reverseCalcs) {

                
//                 revCalcs.push({
//                     field: revCalc.field,
//                     value: revCalc.calc({ ...params, year})
//                 })
//             }
//         }
        
//     }
// }

module.exports = router;
