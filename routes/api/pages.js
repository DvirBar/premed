const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const Page = require('../../models/Page');  
const modelName = 'page';

// Errors
const pageMessages = require('../../messages/pages');
const { PageNotExist,SubpageDetailsRequired,
     SubpageDetailsNotUnique, SubpageNotExist, SuccessDelete } = pageMessages;

// @route   GET api/pages/:id
// @desc    Get page by id
// @access  Private
router.get('/:id', (req, res, next) => {
    Page.findById(req.params.id)
            .then(page => {
                if(!page) return res.status(PageNotExist.status).json(PageNotExist.msg);
                
                return res.json(page);
            })
            .catch(next)
})

// @route   GET api/pages
// @desc    Get all pages
// @access  Private
router.get('/', (req, res, next) => { 
    Page.find()
        .then(page => res.json(page))
        .catch(next);
})
 
// @route   POST api/pages
// @desc    Create new page
// @access  Admin
router.post('/', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        url 
    } = req.body;

    res.locals.model = modelName;

    // Create new path
    const newPage = new Page({
        name: name,
        url: url
    })

    newPage.save()
            .then(page => {
                return res.json(page)
            })
            .catch(next);
})

// @route   PUT api/paths/:id
// @desc    Update page basic details
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        url
     } = req.body;

    res.locals.model = modelName;

    const pageId = req.params.id;

    Page.findById(pageId)
              .then(page => {
                if(!page) return res.status(PageNotExist.status).send(PageNotExist.msg)
                    
                page.name = name;
                page.url = url;

                page.save()
                    .then(page => {
                        return res.json(page)              
                    })
                    .catch(next);
                })
              .catch(next);
});

// @route   PUT api/pagess/:id/item
// @desc    Create new subpage
// @access  Admin
router.put('/:id/subpage', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        url
    } = req.body;

    res.locals.model = modelName;
    const pageId = req.params.id;

    if(!name || !url)
        return res.status(SubpageDetailsRequired.status).send(SubpageDetailsRequired.msg)
    
    Page.findById(pageId)
         .then(page => {
            if(!page) return res.status(PageNotExist.status).send(PageNotExist.msg)
            
            // Check that subpage name and url are unique for that page
            const found = page.subpages.find(subpage => 
                subpage.name === name || subpage.url === url)
            
            if(found)
                return res.status(SubpageDetailsNotUnique.status).send(SubpageDetailsNotUnique.msg)

            const newSubpage = {
                name: name,
                url: url
            }

            page.subpages.push(newSubpage)
            page.save()
                .then(page => {
                    return res.send(page)
                })
                .catch(next);
         })
         .catch(next);
})


// @route   PUT api/pages/:id/:subpageId
// @desc    Update subpage
// @access  Admin
router.put('/:id/:subpageId', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        url
    } = req.body;

    res.locals.model = modelName;
    const pageId = req.params.id;
    const subpageId = req.params.subpageId;

    if(!name || !url)
        return res.status(SubpageDetailsRequired.status).send(SubpageDetailsRequired.msg)
    
    Page.findById(pageId)
         .then(page => {
            if(!page) return res.status(PageNotExist.status)
                                .send(PageNotExist.msg)
            
            const subPage = page.subpages.id(subpageId)

            if(!subPage)
                return res.status(SubpageNotExist.status)
                          .send(SubpageNotExist.msg)

            // Check that subpage name and url are unique for that page
            const found = page.subpages.find(subpage => 
                subpage._id !== subpageId &&
                (subpage.name === name || subpage.url === url) 
            )
            
            if(found)
                return res.status(SubpageDetailsNotUnique.status)
                          .send(SubpageDetailsNotUnique.msg)

            subPage.set({
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

// @route   PUT api/pages/:id/:subpageId/remove
// @desc    Remove subpage
// @access  Admin
router.put('/:id/:subpageId/remove', [auth, authAdmin], (req, res, next) => {

    const pageId = req.params.id;
    const subpageId = req.params.subpageId;

    Page.findById(pageId)
         .then(page => {
            if(!page) return res.status(PageNotExist.status)
                                .send(PageNotExist.msg)
            
            const subPage = page.subpages.id(subpageId)

            if(!subPage)
                return res.status(SubpageNotExist.status)
                          .send(SubpageNotExist.msg)

            subPage.remove();
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
