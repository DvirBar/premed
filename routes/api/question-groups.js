const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Question group model
const QuestionGroup = require('../../models/QuestionGroup');
const Path = require('../../models/Path');
const modelName = 'question group';

// Errors
const questionGroupMessages = require('../../messages/question-groups');
const pathsMessage = require('../../messages/paths')

const { QuestionGroupNotExist, QuestionNotExist, SuccessDelete } = questionGroupMessages;
const { PathNotExist } = pathsMessage;

// @route   GET api/questgroups/:id
// @desc    Get question group by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
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
// @access  Private
router.get('/', auth, (req, res, next) => { 
    QuestionGroup.find()
            .then(groups => { 
                return res.send(groups)
            })
            .catch(next)
})

// @route   GET api/questgroups/path/:pathId
// @desc    Get all question group by path
// @access  Private
router.get('/path/:pathId', auth, (req, res, next) => { 
    const pathId = req.params.pathId

    Path.findById(pathId)
        .then(path => {
            if(!path && pathId) 
                return res.status(PathNotExist.status)
                          .send(PathNotExist.msg)

            QuestionGroup.find({ path: pathId })
                        .then(groups => {
                            return res.send(groups)
                        })
                        .catch(next) // Find group by path              
        })
        .catch(next); // Find path
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

    Path.findById(pathId)
        .then(path => {
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
        .catch(next); // Find path
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

        Path.findById(pathId)
            .then(path => {
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
                    .catch(next); // Find path
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
