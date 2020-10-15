const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Models
const Topic = require('../../models/Topic');
const Page = require('../../models/Page');
const modelName = 'topic';

// Errors
const topicMessages = require('../../messages/topics');
const pageMessages = require('../../messages/pages');
const authAdmin = require('../../middleware/authAdmin');
const { SuccessDelete, PageRequired, ItemDetailsRequired, 
    LinkDetailsRequired, TopicNotExist, ItemNotExist } = topicMessages;
const { PageNotExist, SubpageNotExist } = pageMessages;

// @route   GET api/topics/:id
// @desc    Get topic by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
    const topicId = req.params.id;

    Topic.findById(topicId)
        .then(topic => {
            if(!topic) return res.status(TopicNotExist.status).send(TopicNotExist.msg);
            
            return res.send(topic);
        })
        .catch(next)
})

// @route   GET api/topics
// @desc    Get all topics
// @access  Private
router.get('/', auth, (req, res, next) => {
    Topic.find()
         .then(topic => res.json(topic))
         .catch(next)
})

// @route   POST api/topics
// @desc    Create new topic
// @access  Admin
router.post('/', [auth,authAdmin], (req, res, next) => {
    const { 
        name,
        description,
        url,
        parentId,
        pageId
    } = req.body;

    res.locals.model = modelName;

    if(!pageId) 
        return res.status(PageRequired.status)
                  .send(PageRequired.msg)

    // Check that page assigned exists
    Page.findById(pageId)
        .then(page => {
            if(!page) 
            return res.status(PageNotExist.status)
                      .send(PageNotExist.msg)

            Topic.findById(parentId)
                 .then(topic => {
                    if(!topic && parentId) 
                        return res.status(TopicNotExist.status).send(TopicNotExist.msg)

                    const newTopic = new Topic({
                        name: name,
                        description: description,
                        url: url,
                        parent: parentId,
                        page: pageId
                    })
        
                    newTopic.save()
                            .then(topic => {
                                return res.send(topic)
                            })
                            .catch(next)
                    })
                    .catch(next);
        })
        .catch(next)
})

// @route   PUT api/topics/:id
// @desc    Update topic details
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        description,
        url,
        parentId } = req.body;

    res.locals.model = modelName;

    const topicId = req.params.id;

    Topic.findById(topicId)
         .then(topic => {
            if(!topic) 
                return res.status(TopicNotExist.status)
                          .send(TopicNotExist.msg)
            
            Topic.findById(parentId)
                 .then(parentTopic => {
                    if(!parentTopic && parentId)
                      return res.status(TopicNotExist.status).send(TopicNotExist.msg)
              
                    topic.name = name;
                    topic.description = description;
                    topic.url = url,
                    topic.parent = parentId

                    topic.save()
                        .then(topic => {
                            return res.send(topic);
                        })
                        .catch(next);
                 })
                 .catch(next);
         })
         .catch(next);
})

// @route   PUT api/topics/:id/item
// @desc    Create new item
// @access  Admin
router.put('/:id/item', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        icon,
        link
    } = req.body;

    res.locals.model = modelName;
    const topicId = req.params.id;

    if(!name)
        return res.status(ItemDetailsRequired.status).send(ItemDetailsRequired.msg)

    Topic.findById(topicId)
         .then(topic => {
             if(!topic) return res.status(TopicNotExist.status).send(TopicNotExist.msg)

             const newItem = {
                 name: name,
                 icon: icon,
                 link: link
             }

             topic.items.push(newItem)
             topic.save()
                  .then(topic => {
                      return res.send(topic)
                  })
                  .catch(next);
         })
         .catch(next);
})


// @route   PUT api/topics/:id/item/:itemId
// @desc    Update item
// @access  Admin
router.put('/:id/:itemId', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        icon,
        link 
    } = req.body;

    res.locals.model = modelName;
    const topicId = req.params.id;
    const itemId = req.params.itemId

    if(!name)
        return res.status(ItemDetailsRequired.status).send(ItemDetailsRequired.msg)

    Topic.findById(topicId)
         .then(topic => {
            if(!topic) return res.status(TopicNotExist.status).send(TopicNotExist.msg)
        
            const item = topic.items.id(itemId)
            if(!item)
                return res.status(ItemNotExist.status).msg(ItemNotExist.msg)
            
            item.set({
                name: name,
                icon: icon,
                link: link
            })

            topic.save()
                 .then(topic => {
                     return res.send(topic)
                 })
                 .catch(next)
         })
         .catch(next);
})

// @route   PUT api/topics/:id/:itemId/toggleLike
// @desc    Toggle like of item
// @access  Private
router.put('/:id/:itemId/toggleLike', auth, (req, res, next) => {
    const topicId = req.params.id
    const itemId = req.params.itemId
    const userId = res.locals.user.id

    Topic.findById(topicId)
         .then(topic => {
            if(!topic)
                return res.status(TopicNotExist.status).send(TopicNotExist.msg)
            
            const item = topic.items.id(itemId)
            if(!item)
                return res.status(ItemNotExist.status).send(ItemNotExist.msg)
        
            // Check if user has already liked the item
            const hasLiked = item.likes.users.find(user => String(user) === userId)
            const likes = item.likes.count 
            item.set({
                likes: {
                    count: hasLiked ? likes - 1 : likes + 1,
                    users: hasLiked 
                    ? item.likes.users.filter(user => String(user) !== userId)
                    : [...item.likes.users, userId]
                }
            })

            topic.save()
                .then(topic => {
                    return res.send(topic)
                })
                .catch(next);
         })
         .catch(next);
})


// @route   PUT api/topics/:id/:itemId/remove
// @desc    Remove item
// @access  Admin
router.put('/:id/:itemId/remove', [auth, authAdmin], (req, res, next) => {

    const topicId = req.params.id;
    const itemId = req.params.itemId;

    Topic.findById(topicId)
    .then(topic => {
       if(!topic) return res.status(TopicNotExist.status).send(TopicNotExist.msg)
   
       const item = topic.items.id(itemId)
       if(!item)
           return res.status(ItemNotExist.status).send(ItemNotExist.msg)
       
       item.remove()
       topic.save()
            .then(topic => {
                return res.send(topic)
            })
            .catch(next)
    })
    .catch(next);
})


// @route   DELETE api/topics/:id
// @desc    Delete topic
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const topicId = req.params.id;

    Topic.findById(topicId)
        .then(topic => {
            if(!topic) return res.status(TopicNotExist.status).send(TopicNotExist.msg);

            // Delete ref from children
            topic.remove()
                 .then(() => {
                     res.send(SuccessDelete.msg)
                 })
                 .catch(next);
            })
            .catch(next);
})



module.exports = router;
