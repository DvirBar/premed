const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const Step = require('../../models/Step');
const modelName = 'step';

import internalData from '../../utils/internalData';
const { paths } = internalData;

import fields from '../../utils/stats/fields/dataFields';
// Errors
const stepsMessages = require('../../messages/steps');
const pathsMessages = require('../../messages/paths');
const { SuccessDelete, StepNotExist, ParentNotExist, 
    PrevStepNotExist, StrangerLinking } = stepsMessages;
const { PathNotExist } = pathsMessages;


// @route   GET api/steps
// @desc    Get all steps
// @access  Public
router.get('/', (req, res, next) => { 
    Step.find()
        .select('-author')
        .then(step => res.send(step))
        .catch(next)
})

// @route   GET api/steps/:pathId/:uniId
// @desc    Get steps by path and unis
// @access  Public
router.post('/', async(req, res, next) => { 
    const {
        pathId,
        uniIds
    } = req.body

    try {
        const steps = await Step.find({$and: [
            { path: pathId }, 
            { 'uniData.uni': {$in: uniIds }}
        ]}).select('-author')

        return res.status(200).send(steps)
    }

    catch(err) {
        next(err)
    }
})


// @route   POST api/steps
// @desc    Create new step
// @access  Admin
router.post('/addStep', [auth, authAdmin], async(req, res, next) => {
    const { 
        name,
        prevId,
        parentId,
        isFinal,
        pathId,
        uniIds
    } = req.body;

    res.locals.model = modelName;

    const userId = res.locals.user.id;

    const path = paths.find(path => path._id === pathId)
    if(!path) 
        return res.status(PathNotExist.status)
                  .send(PathNotExist.msg);

    let parentStep

    if(parentId) {
        try {
            parentStep = await Step.findById(parentId)
            if(!parentStep) {
                return res.status(ParentNotExist.status)
                        .send(ParentNotExist.msg)
            }
        }
        
        catch(err) {
            next(err)
        }
    }

    let prevStep
    if(prevId) {
        try {   
            // Find previous step and check that it exists
            prevStep = await Step.findById(prevId)

            if(!prevStep) {
                return res.status(PrevStepNotExist.status)
                            .send(PrevStepNotExist.msg)
            }

            // Check that linked step has the same parent and path
            if((parentId && prevStep.parent != parentId) || 
            prevStep.path != pathId)
                return res.status(StrangerLinking.status)
                            .send(StrangerLinking.msg)
        }
        
        catch(err) {
            next(err)
        }
    }

    // Create new step
    const newStep = new Step({
        name: name,
        prev: prevId,
        uniData: [],
        parent: parentId,
        path: pathId,
        author: userId
    })

    for(let uniId of uniIds) {
        newStep.uniData.push({
            uni: uniId,
            isFinal
        })
    }

    try {
        const step = await newStep.save()
        return res.status(201).send(step)
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id
// @desc    Update step
// @access  Admin
router.put('/:id', [auth, authAdmin], async(req, res, next) => {
    const {
        content
    } = req.body;

    const stepId = req.params.id

    let step

    try {
        step = await Step.findById(stepId)
        
        if(!step) {
            return res.status(StepNotExist.status)
                      .send(StepNotExist.msg)
        }
    }

    catch(err) {
        next(err)
    }

    step.genContent = content


    try {
        const resStep = await step.save()
    
        return res.status(200).send(resStep.genContent)    
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/addLinkInfo
// @desc    Add info to step link
// @access  Admin
router.put('/:id/addLinkInfo', [auth, authAdmin], async(req, res, next) => {
    const {
        name,
        fieldId
    } = req.body;

    const stepId = req.params.id

    let step

    try {
        step = await Step.findById(stepId)

        if(!step) {
            return res.status(StepNotExist.status)
                      .send(StepNotExist.msg)
        }
    }

    catch(err) {
        next(err)
    }

    const field = fields.find(thisField => 
        thisField._id === fieldId) 

    step.linkInfo = {
        ...step.linkInfo,
        name,
        field: fieldId
    }

    try {
        const resStep = await step.save()
    
        return res.status(200).send({
            ...resStep.linkInfo,
            field: field
        })    
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/addDescGroup
// @desc    Add info to description group
// @access  Admin
router.put('/:id/addDescGroup', [auth, authAdmin], async(req, res, next) => {
    const {
        stepId,
        ratio
    } = req.body;

    const reqStepId = req.params.id

    let step

    try {
        step = await Step.findById(reqStepId)

        if(!step) {
            return res.status(StepNotExist.status)
                      .send(StepNotExist.msg)
        }
    }

    catch(err) {
        next(err)
    } 

    let refStep
    try {
        refStep = await Step.findById(stepId)

        if(!refStep) {
            return res.status(StepNotExist.status)
                      .send(StepNotExist.msg)
        }
    }

    catch(err) {
        next(err)
    }

    const descriptions = step.prevDescriptions
    let found = true
    
    for(let desc of descriptions) {
        if(desc.step === stepId) {
            found = true
            desc.ratio = ratio
            break;
        }
    }

    if(!found) {
        descriptions.push({
            step: stepId,
            ratio
        })        
    }

    try {
        const savedStep = await step.save()
    
        return res.status(200).send(savedStep.prevDescriptions)   
    }

    catch(err) {
        next(err)
    }
})


// @route   PUT api/steps/:id/addUniContent
// @desc    Add specific university content
// @access  Admin
router.put('/:id/:uniId/addContent', [auth, authAdmin], async(req, res, next) => {
    const {
        content,
        isFinal
    } = req.body;

    const stepId = req.params.id
    const uniId = req.params.uniId

    let step 
    try {
        step = await Step.findById(stepId)

        if(!step) 
            return res.status(StepNotExist.status)
                      .send(StepNotExist.msg)
    }

    catch(err) {
        next(err)
    }

    const uniData = step.uniData.find(dataItem => 
        dataItem.uni === uniId)

    uniData = {
        ...uniData,
        content,
        isFinal
    }

    try {
        await step.save()
        return res.status(200).send(uniData)
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/addUniContent
// @desc    Add specific university content
// @access  Admin
router.put('/:id/:uniId/addUniContent', [auth, authAdmin], async(req, res, next) => {
    const {
        content,
        isFinal
    } = req.body;

    const stepId = req.params.id
    const uniId = req.params.uniId

    let step 
    try {
        step = await Step.findById(stepId)

        if(!step) 
            return res.status(StepNotExist.status)
                      .send(StepNotExist.msg)
    }

    catch(err) {
        next(err)
    }

    const uniData = step.uniData.find(dataItem => 
        dataItem.uni === uniId)

    uniData = {
        ...uniData,
        content,
        isFinal
    }

    try {
        await step.save()
        return res.status(200).send(uniData)
    }

    catch(err) {
        next(err)
    }
})


// @route   DELETE api/steps/:id
// @desc    Delete step
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const stepId = req.params.id;

    Step.findById(stepId)
        .then(step => {
        if(!step) return res.status(StepNotExist.status).send(StepNotExist.msg);

        step.remove()
            .then(() => {
                Step.updateMany({ prev: stepId }, { prev: undefined })
                    .then(() => {
                        Step.updateMany({ parent: stepId }, { parent: undefined })
                            .then(() => {
                                return res.send(SuccessDelete.msg)
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
            .catch(next);
        })
        .catch(next);
})

module.exports = router;
