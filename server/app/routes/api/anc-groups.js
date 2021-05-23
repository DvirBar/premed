const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Anouncement group model
const AncGroup = require('../../models/AncGroup');
const Path = require('../../models/Path');
const modelName = 'anouncement group';

// Errors
const ancGroupMessage = require('../../messages/anc-groups');
const { NotExist, SuccessDelete, AlreadySubscribed, 
    SuccessSubscribe, AlreadyUnsubscribed, SuccessUnsubscribe} = ancGroupMessage;

// @route   GET api/ancgroups/:id
// @desc    Get anouncement group by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
    AncGroup.findById(req.params.id)
            .select('-subscribers')
            .then(group => {
                if(!group) return res.status(NotExist.status).json(NotExist.msg);
                
                return res.json(group);
            })
            .catch(next)
})

// @route   GET api/ancgroups
// @desc    Get all anouncement groups
// @access  Private
router.get('/', auth, (req, res, next) => { 
    AncGroup.find()
            .then(groups => res.json(groups))
            .catch(next)
})

// @route   GET api/ancgroups/:userId/subscribes
// @desc    Get all user subscriptions
// @access  Private
router.get('/:userId/subscribes', auth, (req, res, next) => { 
    const userId = res.locals.user.id;

    AncGroup.find({ userId: userId })
        .select('-subscribers')
        .then(groups => res.json(groups))
        .catch(next);
})

// @route   POST api/ancgroups
// @desc    Create new anouncement group
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        pathId 
    } = req.body;

    res.locals.model = modelName;

    // Create new anouncement group
    const newGroup = new AncGroup({
        name: name,
        path: pathId
    })

    newGroup.save()
            .then(group => { return res.json(group) })
            .catch(next)
})

// @route   PUT api/ancgroups/:id
// @desc    Update anouncement group
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const {
        name, 
        pathId
    } = req.body;

    res.locals.model = modelName;

    const groupId = req.params.id;

    AncGroup.findById(groupId)
              .then(group => {
                if(!group) return res.status(NotExist.status).send(NotExist.msg)
                    
                group.name = name;
                group.path = pathId;

                group.save()
                    .then(group => {
                        return res.json(group)              
                    })
                    .catch(next)
                })
              .catch(next);
});

// @route   PUT api/ancgroups/:id/subscribe
// @desc    Subscribe to group
// @access  Private
router.put('/:id/subscribe', auth, (req, res, next) => {
    const userId = res.locals.user.id;
    const groupId = req.params.id

    AncGroup.findById(groupId)
            .then(group => {
                if(!group) return res.status(NotExist.status).send(NotExist.msg);
            
                const isExist = group.subscribers.id(userId)
                if(isExist)
                    return res.status(AlreadySubscribed.status).send(AlreadySubscribed.msg);

                group.subscribers.push(userId);

                group.save()
                        .then(() => res.send(SuccessSubscribe.msg))
                        .catch(next);
            })
            .catch(next);
}) 

// @route   PUT api/ancgroups/:id/unsubscribe
// @desc    Unsubscribe to group
// @access  Private
router.put('/:id/unsubscribe', auth, (req, res, next) => {
    const userId = res.locals.user.id;
    const groupId = req.params.id

    AncGroup.findById(groupId)
            .then(group => {
                if(!group) return res.status(NotExist.status).send(NotExist.msg);

                const delSub = group.subscribers.id(userId)

                if(!delSub)
                    return res.status(AlreadyUnsubscribed.status).send(AlreadyUnsubscribed.msg);

                delSub.remove();
                group.save()
                        .then(() => res.send(SuccessUnsubscribe.msg))
                        .catch(next);
            })
            .catch(next);
}) 

// @route   PUT api/ancgroups/:id
// @desc    Add path
// @access  Admin
router.put('/:id/addpath', [auth, authAdmin], (req, res, next) => {
    const { pathId } = req.body;

    res.locals.model = modelName;

    const groupId = req.params.id;

    AncGroup.findById(groupId)
              .then(group => {
                if(!group) return res.status(NotExist.status).send(NotExist.msg)
                    
                group.path = pathId;

                group.save()
                    .then(group => {
                        return res.json(group)              
                    })
                    .catch(next)
                })
              .catch(next);
});


// @route   DELETE api/ancgroups/:id
// @desc    Delete anouncement group
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const groupId = req.params.id;

    AncGroup.findById(groupId)
              .then(group => {
                if(!group) return res.status(NotExist.status).send(NotExist.msg);

                group.remove()
                    .then(() => {
                        return res.send(SuccessDelete.msg)
                    })
                    .catch(next)
              })
              .catch(next);
})

module.exports = router;
