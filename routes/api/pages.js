const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Models
const Page = require('../../models/Page');  
const modelName = 'page';

// Errors
const pageMessages = require('../../messages/pages');
const { PageNotExist, SuccessDelete } = pageMessages;

// @route   GET api/pages/:id
// @desc    Get page by id
// @access  Private
router.get('/:id', auth, (req, res, next) => {
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
router.get('/', auth, (req, res, next) => { 
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
        navParent,
        url 
    } = req.body;

    res.locals.model = modelName;

    // Create new path
    const newPage = new Page({
        name: name,
        navParent: navParent,
        url: url
    })

    newPage.save()
            .then(page => {
                return res.json(page)
            })
            .catch(next);
})

// @route   PUT api/paths/:id
// @desc    Update page
// @access  Admin
router.put('/:id', [auth, authAdmin], (req, res, next) => {
    const { 
        name,
        navParent,
        links,
        url
     } = req.body;

    res.locals.model = modelName;

    const pageId = req.params.id;

    Page.findById(pageId)
              .then(page => {
                if(!page) return res.status(PageNotExist.status).send(PageNotExist.msg)
                    
                page.name = name;
                page.navParent = navParent;
                page.links = [...page.links, links];
                page.url = url;

                page.save()
                    .then(page => {
                        return res.json(page)              
                    })
                    .catch(next);
                })
              .catch(next);
});


// @route   DELETE api/pages/:id
// @desc    Delete page
// @access  Admin
router.delete('/:id', [auth, authAdmin], (req, res, next) => {

    const pageId = req.params.id;

    Page.findById(pageId)
        .then(page => {
            if(!page) return res.status(PageNotExist.status).send(PageNotExist.msg);

            // TODO: Remove page from linked 
            page.remove()
                .then(() => {
                    return res.send(SuccessDelete.msg)
                })
                .catch(next);
        })
        .catch(next);
})

module.exports = router;
