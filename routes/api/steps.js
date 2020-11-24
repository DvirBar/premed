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
const { SuccessDelete, StepNotExist, ParentNotExist, 
    PrevStepNotExist, StrangerLinking } = stepsMessages;
const { PathNotExist } = pathsMessages;

// @route   GET api/steps/:id
// @desc    Get step by id
// @access  Public
router.get('/:id',  [auth, authAdmin], (req, res, next) => {
    Step.findById(req.params.id)
        .then(step => {
            if(!step) return res.status(StepNotExist.status).send(StepNotExist.msg);
            
            return res.send(step);
        })
        .catch(next)
})

// @route   GET api/steps
// @desc    Get all steps
// @access  Public
router.get('/', (req, res, next) => { 
    Step.find()
        .select('-author')
        .then(step => res.send(step))
        .catch(next)
})

// @route   POST api/steps
// @desc    Create new step
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        prevId,
        parentId,
        pathId
    } = req.body;

    res.locals.model = modelName;

    const userId = res.locals.user.id;

    const path = paths.find(path => path._id === path)
    if(!path) 
        return res.status(PathNotExist.status)
                  .send(PathNotExist.msg);

    Step.findById(parentId)
        .then(parent => {
            if(!parent && parentId) 
                return res.status(ParentNotExist.status)
                            .send(ParentNotExist.msg);
            
            Step.findById(prevId)
            .then(prevStep => {
                if(prevId) {
                    if(!prevStep) 
                        return res.status(PrevStepNotExist.status)
                                    .send(PrevStepNotExist.msg)

                    if((parentId && prevStep.parent != parentId) || prevStep.path != pathId)
                    // Check that the linked step has the same parent and path
                        return res.status(StrangerLinking.status)
                                    .send(StrangerLinking.msg)
                }
                
                // Create new step
                const newStep = new Step({
                    name: name,
                    prev: prevId,
                    parent: parentId,
                    path: pathId,
                    author: userId
                })

                newStep.save()
                        .then(step => {
                                return res.send(step)
                            })
                        .catch(next)     
                })
            .catch(next)    
        })
        .catch(next)
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
