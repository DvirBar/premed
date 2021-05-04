const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Section model
const Section = require('../../models/Section');
const modelName = 'section';

// @route   GET api/sections/:id
// @desc    Get section by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
    const sectionId = req.params.id;
    const userId = res.locals.user.id;

    Section.findById(sectionId)
        .then(section => {
            if(!section) return res.status(404).json({ msg: 'Section does not exist' });

            Section.findOne({ $and: [{userId: userId}, {_id: sectionId}]})
                   .then(section => {
                       if(!section) return res.status(401).send({ msg: "You do not own this section!" });

                       return res.json(section);
                   })
                   .catch(next);
        })
        .catch(next)
})

// @route   GET api/sections
// @desc    Get all user sections
// @access  Private
router.get('/', auth, (req, res, next) => {
    const userId = res.locals.user.id
    
    Section.find({userId})
        .then(section => res.json(section))
        .catch(next)
})

// @route   POST api/sections
// @desc    Create new section
// @access  Private
router.post('/', auth, (req, res, next) => {
    const { name } = req.body;

    res.locals.model = modelName;

    const userId = res.locals.user.id;

    // Find index
    Section.countDocuments({ userId })
           .then(count => {
                 // Create new section
                newSection = new Section({
                    name: name,
                    index: count,
                    userId: userId
                })

                newSection.save()
                          .then(section => {
                             return res.send(section);
                          })
                          .catch(next);
           })
           .catch(next);
})

// @route   PUT api/sections/:id
// @desc    Update section
// @access  Private
router.put('/:id', auth, (req, res, next) => {
    const { name } = req.body;

    res.locals.model = modelName;

    const sectionId = req.params.id;
    const userId = res.locals.user.id;

    Section.findById(sectionId)
           .then(section => {
             if(!section) return res.status(404).send({ msg: 'Section not found' })
                
             Section.findOne({ $and: [{userId: userId}, {_id: sectionId}]})
                    .then(section => {
                        if(!section) return res.status(401).send({ msg: 'You do not own this section!' })

                        section.name = name;      

                        section.save()
                            .then(section => {
                            return res.send(section);         
                            })
                            .catch(next);
                    })
                    .catch(next);
            })
           .catch(next);
})

// @route   PUT api/sections/:id/item
// @desc    Create new item
// @access  Private
router.put('/:id/item', auth, (req, res, next) => {
    const { 
        name,
        content 
    } = req.body;

    res.locals.model = modelName;

    const userId = res.locals.user.id;
    const sectionId = req.params.id;

    if(!name || !content)
        return res.status(400).send({ msg: "Missing details" })

    // Find index
    Section.findById(sectionId)
           .then(section => {
               if(!section) return res.status(404).send({ msg: "Section does not exist" });

            Section.findOne({ $and: [{userId: userId}, {_id: sectionId}]})
                   .then(section => {
                        if(!section) return res.status(401).send({ msg: "You do not own this section" });

                        const count = section.items.length;
                        const newItem = {
                            name: name,
                            content: content,
                            index: count
                        }

                        section.items.push(newItem);
                        section.save()
                               .then(section => {
                                   return res.send(section);
                               })
                               .catch(next);
                    })
                   .catch(next);
           })
           .catch(next);
})


// @route   PUT api/sections/:id/item/:itemId
// @desc    Update item
// @access  Private
router.put('/:id/item/:itemId', auth, (req, res, next) => {
    const { 
        name,
        content 
    } = req.body;

    res.locals.model = modelName;

    const sectionId = req.params.id;
    const itemId = req.params.itemId;
    const userId = res.locals.user.id;

    if(!name || !content)
        return res.status(400).send({ msg: "Missing details" })

    // Check that user
    Section.findById(sectionId)
           .then(section => {
             if(!section) return res.status(404).send({ msg: 'Section not found' })
            
             Section.findOne({ $and: [{userId: userId}, {_id: sectionId}]})
                    .then(section => {
                        if(!section) return res.status(401).send({ msg: 'You do not own this section!' })

                        const item = section.items.id(itemId);
                        if(!item) 
                            return res.status(404).send({ msg: "Item not found" });

                        item.set({
                            name: name,
                            content: content
                        })

                        section.save()
                               .then(section => {
                                   return res.send(section)
                               })
                               .catch(next);
                    })
                    .catch(next);
            })
           .catch(next);
})

// @route   PUT api/sections/:id/item/:itemId/remove
// @desc    Remove item
// @access  Private
router.put('/:id/item/:itemId/remove', auth, (req, res, next) => {

    const sectionId = req.params.id;
    const itemId = req.params.itemId;
    const userId = res.locals.user.id;

    Section.findById(sectionId)
            .then(section => {
                if(!section) return res.status(404).send({ msg: 'Section does not exist' });

                Section.findOne({ $and: [{userId: userId}, {_id: sectionId}]})
                       .then(section => {
                            if(!section) return res.status(401).send({ msg: 'You do not own this section!' });

                            const delItem = section.items.id(itemId)
                            if(!delItem)
                                return res.status(404).send({ msg: "Item not found" });

                            delItem.remove();
                            section.save()
                                   .then(section => {
                                            return res.send(section);
                                        })
                                    .catch(e => {throw e});
                            })
                       .catch(e => {throw e});
              })
              .catch(next);
})


// @route   DELETE api/sections/:id
// @desc    Delete section
// @access  Private
router.delete('/:id', auth, (req, res, next) => {

    const sectionId = req.params.id;
    const userId = res.locals.user.id

    Section.findById(sectionId)
            .then(section => {
                if(!section) return res.status(404).send({ msg: 'Section does not exist' });

                Section.findOne({ $and: [{userId: userId}, {_id: sectionId}]})
                       .then(section => {
                            if(!section) return res.status(401).send({ msg: 'You do not own this section!' });

                            section.remove()
                                .then(() => {
                                    return res.send({ msg: 'Section was deleted successfully' });
                                })
                                .catch(next);
                            })
                       .catch(next);
              })
              .catch(next);
})



module.exports = router;
