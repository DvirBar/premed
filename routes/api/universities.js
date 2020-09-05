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

const { UniNotExist } = uniMessages;
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
              .then(uni => res.send(uni))
              .catch(next);
})
 
// @route   POST api/universities
// @desc    Create university
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        color
    } = req.body;

    res.locals.model = modelName;

    const newUni = new University({
        name: name,
        color: color
    })

    newUni.save()
          .then(uni => {
                return res.send(uni)
            })
          .catch(next);  
})

// @route   PUT api/universities/:id
// @desc    Update university
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
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
                uni.color = color;

                uni.save()
                   .then(uni => {
                        return res.send(uni)              
                    })
                    .catch(next); // Save university
            })
            .catch(next); // Find university
});

// @route   PUT api/universities/:id/addPath
// @desc    Add path to university
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        pathId
    } = req.body;

    res.locals.model = modelName;

    const uniId = req.params.id;

    University.findById(uniId)
            .then(uni => {
                // Check that university exists
                if(!uni) 
                    return res.status(UniNotExist.status)
                              .send(UniNotExist.msg)
                
                Path.findById(pathId)
                    .then(uni => {
                        if(!uni)
                            return res.status(PathNotExist.status)
                                      .send(PathNotExist.msg)
                        
                        uni.paths.push(pathId)

                        uni.save()
                            .then(uni => {
                                return res.send(uni)              
                            })
                            .catch(next); // Save university                      
                    })
                    .catch(next); // Find path
            
            })
            .catch(next); // Find university
});

// @route   PUT api/universities/:id/:pathId/removePath
// @desc    Remove path from university
// @access  Admin
router.put('/:id/:pathId/remove', [auth, authAdmin], (req, res, next) => {
    const uniId = req.params.id;
    const pathId = req.params.id;
    
    University.findById(uniId)
            .then(uni => {
                // Check that university exists
                if(!uni) 
                    return res.status(UniNotExist.status)
                              .send(UniNotExist.msg)
                
                Path.findById(pathId)
                    .then(uni => {
                        // Check that path exists
                        if(!uni)
                            return res.status(PathNotExist.status)
                                      .send(PathNotExist.msg)
                        
                        const delPath = uni.paths.find(pathId)
                        delPath.remove()
                        
                        uni.save()
                            .then(uni => {
                                return res.send(uni)              
                            })
                            .catch(next); // Save university                      
                    })
                    .catch(next); // Find path
            
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
                        return res.send(DataGroupSuccessDelete.msg)
                    })
                   .catch(next); // Remove university
            })
            .catch(next); // Find university
})

module.exports = router;
