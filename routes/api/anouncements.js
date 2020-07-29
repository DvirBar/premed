const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Anouncement model
const Anouncement = require('../../models/Anouncement');
const modelName = 'anouncement';

// Errors
const ancMessage = require('../../messages/anouncements');
const { AncNotExist, SuccessDelete } = ancMessage;

// @route   GET api/anouncements/:id
// @desc    Get anouncement by id
// @access  Public
router.get('/:id', (req, res, next) => {
    Anouncement.findById(req.params.id)
        .select("-userId")
        .then(anc => {
            if(!anc) return res.status(AncNotExist.status).json(AncNotExist.msg);
            
            return res.json(anc);
        })
        .catch(next)
})

// @route   GET api/anouncements
// @desc    Get all anouncements without author Id
// @access  Public
router.get('/', (req, res, next) => { 
    Anouncement.find()
        .select("-userId")
        .populate("group")
        .then(anc => res.json(anc))
        .catch(next)
})

// @route   GET api/anouncements/all/extended
// @desc    Get all anouncements with author Id
// @access  Admin
router.get('/all/extended', [auth, authAdmin], (req, res, next) => { 
    Anouncement.find()
        .then(anc => res.json(anc))
        .catch(next)
})

// @route   POST api/anouncements
// @desc    Create new anouncement
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        title,
        content,
        groupId
    } = req.body;

    res.locals.model = modelName;

    const userId = res.locals.user.id
    // Create new anouncement
    newAnc = new Anouncement({
        title: title,
        content: content,
        userId: userId,
        group: groupId
    })

    newAnc.save()
            .then(anc => {
                return res.json(anc)
            })
            .catch(next)
})

// @route   PUT api/anouncements/:id
// @desc    Update anouncement
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const {
        title,
        content,
        groupId
    } = req.body;

    res.locals.model = modelName;

    const ancId = req.params.id;
    const userId = res.locals.user.id;

    Anouncement.findById(ancId)
              .then(anc => {
                if(!anc) return res.status(AncNotExist.status).send(AncNotExist.msg)
                    
                anc.title = title;
                anc.content = content;  
                anc.userId = userId;
                anc.group = groupId  

                anc.save()
                    .then(anc => {
                        async function populateAnc() {
                            await anc.populate("group").execPopulate();
                            return res.json(anc); 
                        } 
                        populateAnc();
                    })
                    .catch(next)
                })
              .catch(next);
})

// @route   DELETE api/anouncements/:id
// @desc    Delete anouncement
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const ancId = req.params.id;

    Anouncement.findById(ancId)
              .then(anc => {
                if(!anc) return res.status(AncNotExist.status).send(AncNotExist.msg);

                anc.remove()
                    .then(() => {
                        return res.send(SuccessDelete.msg)
                    })
                    .catch(next)
              })
              .catch(next);
})

module.exports = router;
