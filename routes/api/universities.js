const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const University = require('../../models/University');
const Path = require('../../models/Path');
const modelName = 'university';

// Errors
const uniMessages = require('../../messages/universities');
const pathsMessages = require('../../messages/paths');
const { json } = require('express');

const { UniNotExist, PathsNotFound, UniSuccessDelete } = uniMessages;
const { PathNotExist } = pathsMessages;

// @route   GET api/universitiess/:id
// @desc    Get university by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
    University.findById(req.params.id)
            .then(uni => {
                if(!uni) 
                    return res.status(UniNotExist.status)
                              .send(UniNotExist.msg);
                
                return res.send(uni);
            })
            .catch(next)
})

// @route   GET api/universities
// @desc    Get all universities
// @access  Private
router.get('/', auth, (req, res, next) => { 
    University.find()
              .populate('paths')
              .then(uni => res.send(uni))
              .catch(next);
})
 
// @route   POST api/universities
// @desc    Create university
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        pathIds,
        color
    } = req.body;

    res.locals.model = modelName;
    const newUni = new University({
        name: name,
        paths: [...pathIds],
        color: color
    })

    newUni.save()
        .then(uni => {
            async function populateUni() {
                await uni.populate("paths").execPopulate();
                return res.send(uni)              
            } 
            populateUni();
        })
        .catch(next); 
})

// @route   PUT api/universities/:id
// @desc    Update university
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        pathIds,
        color
    } = req.body;

    res.locals.model = modelName;

    const uniId = req.params.id;

    University.findById(uniId)
            .then(uni => {
            // Check that university exists
                if(!uni) 
                    return res.status(UniNotExist.status)
                              .send(UniNotExist.msg)

                uni.name = name;
                uni.paths = [...pathIds];
                uni.color = color;

                uni.save()
                    .then(uni => {
                        async function populateUni() {
                            await uni.populate("paths").execPopulate();
                            return res.send(uni)              
                        } 
                        populateUni();
                    })
                    .catch(next); // Save university             
            })
            .catch(next); // Find university
});

// @route   DELETE api/universities/:id
// @desc    Delete university
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const uniId = req.params.id;

    University.findById(uniId)
              .then(uni => {
                if(!uni) 
                    return res.status(UniNotExist.status)
                              .send(UniNotExist.msg);

                // TODO: Remove university from related groups and fields                            
                uni.remove()
                   .then(() => {
                        return res.send(UniSuccessDelete.msg)
                    })
                   .catch(next); // Remove university
            })
            .catch(next); // Find university
})

module.exports = router;
