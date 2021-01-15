const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const StepsPath = require('../../models/StepsPath');

import internalData from '../../utils/internalData';
const { paths } = internalData;

// Errors
const stepsPathMessages = require('../../messages/steps-path');
const pathsMessages = require('../../messages/paths');
const { SuccessDelete, StepsPathNotExist } = stepsPathMessages;
const { PathNotExist } = pathsMessages;

// @route   GET api/stepspath
// @desc    Get all steps path
// @access  Public
router.get('/', (req, res, next) => { 
    StepsPath.find()
            .then(step => res.send(step))
            .catch(next)
})

// @route   POST api/stepspath
// @desc    Create new steps path
// @access  Admin
router.post('/', [auth, authAdmin], async(req, res, next) => {
    const { 
        name,
        pathId,
        uniId
    } = req.body;


    // Find path requested
    const path = paths.find(path => path._id === pathId)

    if(!path) 
        return res.status(PathNotExist.status)
                  .send(PathNotExist.msg);

   const newStepsPath = new StepsPath({
        name,
        uni: uniId,
        path: pathId
    })

    try {
        const stepsPath = await newStepsPath.save()
        res.status(201).send(stepsPath)
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
