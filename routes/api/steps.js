const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const Step = require('../../models/Step');
const modelName = 'step';

import internalData from '../../utils/internalData';
const { paths } = internalData;

// Errors
const stepsMessages = require('../../messages/steps');
const pathsMessages = require('../../messages/paths');
const { SuccessDelete, SummarySuccessDelete, GroupSuccessDelete,
    ContentSuccessDelete, StepNotExist, ParentNotExist, 
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
        isTransition,
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
        isTransition,
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
        name,
        prevId,
        parentId,
        genContent
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

    step.name = name
    step.genContent = genContent
    step.prev = prevId
    step.parent = parentId

    try {
        const resStep = await step.save()
    
        return res.status(200).send(resStep)    
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/addLinkLabel
// @desc    Add info to step link
// @access  Admin
router.put('/:id/addLinkLabel', [auth, authAdmin], async(req, res, next) => {
    const {
        labelName,
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

    step.linkLabel = labelName

    try {
        const resStep = await step.save()
    
        return res.status(200).send(resStep.linkLabel)    
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/addSummary
// @desc    Add step summary
// @access  Admin
router.put('/:id/addSummary', [auth, authAdmin], async(req, res, next) => {
    const { 
        name
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

    step.summaries.push({
        name
    })

    try {
        const savedStep = await step.save()
        const lastSum = savedStep.summaries.length - 1
        return res.status(200).send(savedStep.summaries[lastSum])   
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/:sumId
// @desc    Edit summary
// @access  Admin
router.put('/:id/:sumId', [auth, authAdmin], async(req, res, next) => {
    const { 
        name
    } = req.body;

    const stepId = req.params.id
    const sumId = req.params.sumId

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

    const summary = step.summaries.id(sumId)
    summary.name = name

    try {
        await step.save()
        return res.status(200).send(summary)   
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/:sumId/remove
// @desc    Remove summary
// @access  Admin
router.put('/:id/:sumId/remove', [auth, authAdmin], async(req, res, next) => {
    const stepId = req.params.id
    const sumId = req.params.sumId

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

    const summary = step.summaries.id(sumId)
    await summary.remove()

    try {
        await step.save()
        return res.status(SummarySuccessDelete.status)
                  .send(SummarySuccessDelete.msg)   
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/sumId/addGroup
// @desc    Create sum group
// @access  Admin
router.put('/:id/:sumId/addGroup', [auth, authAdmin], async(req, res, next) => {
    const { 
        groupName,
        name,
        ratio
    } = req.body;

    const reqStepId = req.params.id
    const sumId = req.params.sumId

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

    const summary = step.summaries.id(sumId)
    summary.groups.push({
    name: groupName,
    contents:[{
        name,
        ratio
    }]})

    try {
        await step.save()

        const lastGroup = summary.groups.length - 1
        return res.status(200).send(summary.groups[lastGroup])   
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/sumId/:groupId/addContent
// @desc    Add content to summary group
// @access  Admin
router.put('/:id/:sumId/:groupId/addContent', [auth, authAdmin], async(req, res, next) => {
    const { 
        name,
        ratio
    } = req.body;

    const reqStepId = req.params.id
    const sumId = req.params.sumId
    const groupId = req.params.groupId

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

    const summary = step.summaries.id(sumId)
    const group = summary.groups.id(groupId)

    group.contents.push({
        name,
        ratio
    })

    try {
        await step.save()
        
        const lastContent = group.contents.length - 1
        return res.status(200).send(group.contents[lastContent])   
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/sumId/:groupId/:contentId
// @desc    Edit summary group content
// @access  Admin
router.put('/:id/:sumId/:groupId/:contentId', [auth, authAdmin], async(req, res, next) => {
    const {
        name,
        ratio
    } = req.body;

    const reqStepId = req.params.id
    const {
        sumId,
        groupId,
        contentId
    } = req.params

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

    const summary = step.summaries.id(sumId)
    const group = summary.groups.id(groupId)
    const content = group.contents.id(contentId)

    content.name = name
    content.ratio = ratio


    try {
        await step.save()
        return res.status(200).send(content)   
    }

    catch(err) {
        next(err)
    }
})

// @route   PUT api/steps/:id/sumId/:groupId/:contentId/remove
// @desc    Remove summary group content
// @access  Admin
router.put('/:id/:sumId/:groupId/:contentId/remove', [auth, authAdmin], async(req, res, next) => {
    const reqStepId = req.params.id
    const {
        sumId,
        groupId,
        contentId
    } = req.params

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

    const summary = step.summaries.id(sumId)
    const group = summary.groups.id(groupId)
    const content = group.contents.id(contentId)

    await content.remove()

    // Remove group as well if no contents are left
    if(group.contents.length === 0) {
        await group.remove()
    }

    try {
        await step.save()
        return res.status(ContentSuccessDelete.status)
                  .send(ContentSuccessDelete.msg)   
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
