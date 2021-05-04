const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Question group model
const QuestionGroup = require('../../models/QuestionGroup');
const modelName = 'question group';

import internalData from '../../utils/internalData';
const { paths } = internalData;

// Errors
const questionGroupMessages = require('../../messages/question-groups');
const pathsMessage = require('../../messages/paths')

const { QuestionGroupNotExist, QuestionNotExist, SuccessDelete } = questionGroupMessages;
const { PathNotExist } = pathsMessage;

// @route   GET api/questgroups/:id
// @desc    Get question group by id
// @access  Public
router.get('/:id', (req, res, next) => {
    QuestionGroup.findById(req.params.id)
            .then(group => {
                if(!group) 
                    return res.status(QuestionGroupNotExist.status)
                              .send(QuestionGroupNotExist.msg);
                
                return res.send(group);
            })
            .catch(next)
})

// @route   GET api/questgroups
// @desc    Get all question groups
// @access  Public
router.get('/', (req, res, next) => { 
    QuestionGroup.find()
            .then(groups => { 
                return res.send(groups)
            })
            .catch(next)
})

// @route   GET api/questgroups/path/:pathId
// @desc    Get all question group by path
// @access  Public
router.get('/path/:pathId', (req, res, next) => { 
    const pathId = req.params.pathId

    const path = paths.find(path => path._id === pathId)
    
    if(!path && pathId) 
        return res.status(PathNotExist.status)
                    .send(PathNotExist.msg)

    QuestionGroup.find({ path: pathId })
                .then(groups => {
                    return res.send(groups)
                })
                .catch(next) // Find group by path              
})

// @route   POST api/questgroups
// @desc    Create new question group
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        pathId,
        readmore 
    } = req.body;

    res.locals.model = modelName;

    const path = paths.find(path => path._id === pathId)

    if(!path && pathId)
        return res.status(PathNotExist.status)
                    .send(PathNotExist.msg)
        
    // Create new question group
    const newGroup = new QuestionGroup({
        name: name,
        path: pathId,
        read_more: readmore
    })

    newGroup.save()
            .then(group => { 
                return res.send(group) 
            })
            .catch(next) // Save group         
})

// @route   PUT api/questgroups/:id
// @desc    Update question group
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const {
        name, 
        pathId,
        readmore
    } = req.body;

    res.locals.model = modelName;

    const groupId = req.params.id;

       
    QuestionGroup.findById(groupId)
    .then(group => {
        if(!group) 
            return res.status(QuestionGroupNotExist.status)
                      .send(QuestionGroupNotExist.msg)

        const path = paths.find(path => path._id === pathId)
        if(!path && pathId)
            return res.status(PathNotExist.status)
                    .send(PathNotExist.msg)
    
        group.name = name;
        group.path = pathId;
        group.read_more = readmore;

        group.save()
            .then(group => {
                return res.send(group)              
            })
            .catch(next) // Save group
                
        })
    .catch(next); // Find group
});

// @route   PUT api/questgroups/:id/addQuestion
// @desc    Add question
// @access  Admin
router.put('/:id/addQuestion', [auth, authAdmin], (req, res, next) => {
    const {
        question,
        answer,
        sourceLink
    } = req.body;

    const groupId = req.params.id

    QuestionGroup.findById(groupId)
                 .then(group => {
                     if(!group)
                        return res.status(QuestionGroupNotExist.status)
                                  .send(QuestionGroupNotExist.msg)
                        
                    const newQuestion = {
                        question,
                        answer,
                        source_link: sourceLink
                    }

                    group.questions.push(newQuestion)
                    
                    group.save()
                         .then(group => {
                             return res.send(group)
                         })
                         .catch(next);
                 })
});


// @route   PUT api/questgroups/:groupId/:questionId
// @desc    Update question
// @access  Admin
router.put('/:groupId/:questId', [auth, authAdmin], (req, res, next) => {
    const {
        question,
        answer,
        sourceLink
    } = req.body;

    const groupId = req.params.groupId
    const questionId = req.params.questId

    QuestionGroup.findById(groupId)
                 .then(group => {
                     if(!group)
                        return res.status(QuestionGroupNotExist.status)
                                  .send(QuestionGroupNotExist.msg)
                        
                    const storedQuestion = group.questions.id(questionId)
                    if(!storedQuestion)
                        return res.status(QuestionNotExist.status)
                                  .send(QuestionNotExist.msg)

                    storedQuestion.set({ 
                        question,
                        answer,
                        source_link: sourceLink
                    })
                    
                    group.save()
                         .then(group => {
                             return res.send(group)
                         })
                         .catch(next);
                 })
                 .catch(next); // Find question group
});


// @route   PUT api/questgroups/:groupId/:questionId/remove
// @desc    Update question
// @access  Admin
router.put('/:groupId/:questId/remove', [auth, authAdmin], (req, res, next) => {
    const groupId = req.params.groupId
    const questionId = req.params.questId

    QuestionGroup.findById(groupId)
                 .then(group => {
                     if(!group)
                        return res.status(QuestionGroupNotExist.status)
                                  .send(QuestionGroupNotExist.msg)
                        
                    const question = group.questions.id(questionId)
                    if(!question)
                        return res.status(QuestionNotExist.status)
                                  .send(QuestionNotExist.msg)

                    question.remove()
                    
                    group.save()
                         .then(group => {
                             return res.send(group)
                         })
                         .catch(next);
                 })
                 .catch(next); // Find question group
});



// @route   DELETE api/questiongroups/:id
// @desc    Delete question group
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const groupId = req.params.id;

    QuestionGroup.findById(groupId)
              .then(group => {
                if(!group) 
                    return res.status(QuestionGroupNotExist.status)
                              .send(QuestionGroupNotExist.msg);

                group.remove()
                    .then(() => {
                        return res.send(SuccessDelete.msg)
                    })
                    .catch(next); // Remove group
              })
              .catch(next); // Find group
})

module.exports = router;
