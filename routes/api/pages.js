const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const Page = require('../../models/Page');  
const modelName = 'page';

// Errors
const pageMessages = require('../../messages/pages');
const { PageNotExist, PathRequired, LinkDetailsRequired, 
    LinkNotExist, SuccessDelete } = pageMessages;

// @route   GET api/pages/:id
// @desc    Get page by id
// @access  Private
router.get('/:id', (req, res, next) => {
    Page.findById(req.params.id)
            .then(page => {
                if(!page) 
                    return res.status(PageNotExist.status)
                              .send(PageNotExist.msg);
                
                return res.send(page);
            })
            .catch(next)
})

// @route   GET api/pages
// @desc    Get all pages
// @access  Private
router.get('/', (req, res, next) => { 
    Page.find()
        .then(page => res.send(page))
        .catch(next);
})
 
// @route   POST api/pages
// @desc    Create new page
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        url,
        pathIds 
    } = req.body;

    res.locals.model = modelName;

    if(!pathIds || pathIds && pathIds.length === 0) {
        return res.status(PathRequired.status)
                  .send(PathRequired.msg)
    }

    // Create new path
    const newPage = new Page({
        name: name,
        url: url,
        paths: pathIds
    })

    newPage.save()
            .then(page => {
                return res.send(page)
            })
            .catch(next);
})

// @route   PUT api/paths/:id
// @desc    Update page basic details
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        url,
        pathIds
     } = req.body;

    res.locals.model = modelName;

    const pageId = req.params.id;

    if(!pathIds || pathIds && pathIds.length === 0) {
        return res.status(PathRequired.status)
                  .send(PathRequired.msg)
    }

    Page.findById(pageId)
              .then(page => {
                if(!page) return res.status(PageNotExist.status).send(PageNotExist.msg)
                    
                page.name = name;
                page.url = url;
                page.paths = pathIds

                page.save()
                    .then(page => {
                        return res.send(page)              
                    })
                    .catch(next);
                })
              .catch(next);
});

// @route   PUT api/pages/:id/addlink
// @desc    Add new link
// @access  Admin
router.put('/:id/addlink', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        url
    } = req.body;

    res.locals.model = modelName;
    const pageId = req.params.id;

    if(!name || !url)
        return res.status(LinkDetailsRequired.status).send(LinkDetailsRequired.msg)
    
    Page.findById(pageId)
         .then(page => {
            if(!page) return res.status(PageNotExist.status)
                                .send(PageNotExist.msg)

            const newLink = {
                name: name,
                url: url
            }

            page.links.push(newLink)

            page.save()
                .then(page => {
                    return res.send(page)
                })
                .catch(next);
         })
         .catch(next);
})

// @route   PUT api/pages/:id/:linkId
// @desc    Edit link
// @access  Admin
router.put('/:id/:linkId', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        url
    } = req.body;

    res.locals.model = modelName;
    const pageId = req.params.id;
    const linkId = req.params.linkId

    if(!name || !url)
        return res.status(LinkDetailsRequired.status).send(LinkDetailsRequired.msg)
    
    Page.findById(pageId)
         .then(page => {
            // Check that page exists
            if(!page) return res.status(PageNotExist.status)
                                .send(PageNotExist.msg)

            // Check that link exists              
            const link = page.links.id(linkId)
            if(!link)
                return res.status(LinkNotExist.status)
                          .send(LinkNotExist.msg)

            link.set({
                name: name,
                url: url
            })
            
            page.save()
                .then(page => {
                    return res.send(page)
                })
                .catch(next);
         })
         .catch(next);
})

// @route   PUT api/pages/:id/:linkId/remove
// @desc    Remove link
// @access  Admin
router.put('/:id/:linkId/remove', [auth, authAdmin], (req, res, next) => {
    res.locals.model = modelName;
    const pageId = req.params.id;
    const linkId = req.params.linkId

    Page.findById(pageId)
         .then(page => {
            // Check that page exists
            if(!page) 
                return res.status(PageNotExist.status)
                          .send(PageNotExist.msg)

            // Check that link exists              
            const link = page.links.id(linkId)
            if(!link)
                return res.status(LinkNotExist.status)
                          .send(LinkNotExist.msg)

            link.remove()
            
            page.save()
                .then(page => {
                    return res.send(page)
                })
                .catch(next);
         })
         .catch(next);
})


// @route   DELETE api/pages/:id
// @desc    Delete page
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const pageId = req.params.id;

    Page.findById(pageId)
        .then(page => {
            if(!page) return res.status(PageNotExist.status).send(PageNotExist.msg);

            // TODO: Remove page from linked topics 
            page.remove()
                .then(() => {
                    return res.send(SuccessDelete.msg)
                })
                .catch(next);
        })
        .catch(next);
})

module.exports = router;
