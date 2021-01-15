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
// @desc    Get steps by path and uni
// @access  Public
router.get('/:pathId/:uniId', async(req, res, next) => { 
    const pathId = req.params.pathId
    const uniId = req.params.uniId

    try {
        const steps = await Step.find({$and: [
            { path: pathId }, 
            { 'uniData.uni': uniId}
        ]}).select('-author')

        return steps
    }

    catch(err) {
        next(err)
    }
})


// @route   POST api/steps
// @desc    Create new step
// @access  Admin
router.post('/', [auth, authAdmin], async(req, res, next) => {
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

    const path = paths.find(path => path._id === path)
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

    if((parentId && prevStep.parent != parentId) || 
    prevStep.path != pathId)
        // Check that the linked step has the same parent and path
        return res.status(StrangerLinking.status)
                    .send(StrangerLinking.msg)

    let prevStep
    if(prevId) {
        prevStep = await Step.findById(parentId)

        try {
            if(!prevStep) {
                return res.status(PrevStepNotExist.status)
                            .send(PrevStepNotExist.msg)
            }
        }
        
        catch(err) {
            next(err)
        }
    }

    // Create new step
    const newStep = new Step({
        name: name,
        prev: {
            step: prevId
        },
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
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const {
        name,
        content,
        prevId,
        parentId
    } = req.body;

    res.locals.model = modelName;

    const stepId = req.params.id;
    const userId = res.locals.user.id;

    Step.findById(stepId)
        .then(step => {
            if(!step) 
                return res.status(StepNotExist.status)
                          .send(StepNotExist.msg);


            Step.findById(parentId)
            .then(parent => {
                if(!parent && parentId) return res.status(ParentNotExist.status).send(ParentNotExist.msg);

                Step.findById(prevId)
                    .then(prevStep => {
                        if(prevId) {
                            if(!prevStep) 
                                return res.status(PrevStepNotExist.status).send(PrevStepNotExist.msg)

                            if(!step.path.equals(prevStep.path) || 
                                prevStep.parent != parentId)
                            // Check that prev has the same parent
                            // If step is orphan, check that prev is also orphan
                            // Check same path
                                return res.status(StrangerLinking.status).send(StrangerLinking.msg)
                        }

                        step.name = name;
                        step.content = content;
                        step.prev = prevId;
                        step.parent = parentId;
                        step.author = userId;
                        step.last_edited = Date.now()

                        step.save()
                            .then(step => res.send(step))
                            .catch(next);
                    })  
                    .catch(next);
                })
            .catch(next);
            })
        .catch(next);
})

// @route   PUT api/steps/:id
// @desc    Add data to prev link
// @access  Admin
router.put('/:id/addPrevData', [auth, authAdmin], async(req, res, next) => {
    const {
        fieldId,
        decriptionStepId,
        descriptionStepRatio
    } = req.body;

    const stepId = req.params.id

    let step

    try {
        step = await Step.findById(stepId)
    }

    catch(err) {
        next(err)
    }

    if(!step) {
        return res.status(StepNotExist.status)
                  .send(StepNotExist.msg)
    }

    const field = fields.find(thisField => 
        thisField._id === fieldId) 

    step.prev = {
        ...step.prev,
        field: fieldId,
        description: {
            ...step.prev.description,
            step: decriptionStepId,
            ratio: descriptionStepRatio
        }
    }

    try {
        const resStep = await step.save()
    
        return res.status(200).send({
            ...resStep.prev,
            field: field
        })    
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
