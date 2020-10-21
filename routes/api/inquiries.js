const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// Model
const Inquiry = require('../../models/Inquiry');
const modelName = 'inquiry';

// Errors
const inquiryMessages = require('../../messages/inquiries');
const { NotExist, InquiryNotOwned, StatusInvalid, 
    SuccessDelete } = inquiryMessages;

const allowedTypes = require('../../utils/allowedTypes'); 
const { StatusNotExist } = require('../../messages/inquiries');
const { inquiryStatusTypes } = allowedTypes.types;
const { isType } = allowedTypes;

// @route   GET api/inquiries/:id
// @desc    Get inquiry by id
// @access  Private
router.get('/:id', [auth, authAdmin], (req, res, next) => {
    Inquiry.findById(req.params.id)
            .select('-status.admin')
            .then(inquiry => {
                if(!inquiry) 
                    return res.status(NotExist.status)
                              .send(NotExist.msg);
                
                return res.send(inquiry);
            })
            .catch(next)
})


// @route   GET api/inquiries
// @desc    Get all inquiries
// @access  Admin
router.get('/', [auth, authAdmin], (req, res, next) => { 
    Inquiry.find()
            .then(inquiries => res.send(inquiries))
            .catch(next)
})

// @route   GET api/inquiries
// @desc    Get all user inquiries
// @access  Private
router.get('/', auth, (req, res, next) => { 
    const userId = res.locals.user._id

    Inquiry.find({ user: userId })
            .then(inquiries => res.send(inquiries))
            .catch(next)
})


// @route   POST api/inquiries
// @desc    Create new inquiry
// @access  Admin
router.post('/', auth, (req, res, next) => {
    const { 
        text,
        type,
        refLink
    } = req.body;

    const userId = res.locals.user._id
    
    // Create new inquiry
    const newInquiry = new Inquiry({
        text,
        user: userId,
        type,
        refLink,
        statuses: [{
            id: inquiryStatusTypes.find(type => type.default),
        }]
    })

    newInquiry.save()
            .then(inquiry => { 
                return res.send(inquiry) 
            })
            .catch(next)
})

// @route   PUT api/inquiries/:id
// @desc    Update inquiry
// @access  Admin
router.put('/:id', auth, (req, res, next) => {
    const {
        text,
        type
    } = req.body;

    const inquiryId = req.params.id;
    const userId = res.locals.user._id;
    const isAdmin = res.locals.user.isAdmin;

    Inquiry.findById(inquiryId)
              .then(inquiry => {
                if(!inquiry) 
                    return res.status(NotExist.status)
                              .send(NotExist.msg)

                if(inquiry.user !== userId && !isAdmin)
                    return res.status(InquiryNotOwned.status)
                              .send(InquiryNotOwned.msg)
                              
                inquiry = {
                    ...inquiry,
                    text,
                    type
                }

                inquiry.save()
                    .then(inquiry => {
                        return res.send(inquiry)              
                    })
                    .catch(next)
                })
              .catch(next);
});

// @route   PUT api/inquiries/:id/changeStatus
// @desc    Change status
// @access  Admin
router.put('/:id/changeStatus', [auth, authAdmin], (req, res, next) => {
    const {
        value,
        note
    }

    const inquiryId = req.params.id
    const userId = res.locals.user._id

    Inquiry.findById(inquiryId)
           .then(inquiry => {
                if(!inquiry)
                    return res.status(NotExist.status)
                              .send(NotExist.send)
               
                if(!isType(value, inquiryStatusTypes))
                    return res.status(StatusInvalid.status)
                              .send(StatusInvalid.msg)

                const statuses = inquiry.statuses
                const existStatus = statuses.find(status => 
                    status.value === value)

                /* If the requested status already exists, 
                    change its active status to active */

                if(existStatus) {
                    existStatus.active = true
                }

                else {
                    const newStatus = {
                        value,
                        note,
                        admin: userId,
                        active: true
                    }

                    statuses.push(newStatus)
                }

                const activeStatus = statuses.find(status => status.active)
                
                if(activeStatus) {
                    activeStatus.set = ({
                        ...activeStatus,
                        active: false
                    })
                }

                inquiry.save()
                       .then(inquiry => {
                           return res.send(statuses)
                       })
                       .catch(next);
           })
           .catch(next);
}) 

// @route   PUT api/inquiries/:id/:statusId
// @desc    Edit status
// @access  Private
router.put('/:id/:statusId', [auth, authAdmin], (req, res, next) => {
    const {
        note
    }
    
    const userId = res.locals.user.id;
    const inquiryId = req.params.id;
    const statusId = req.params.statusId;

    Inquiry.findById(inquiryId)
            .then(inquiry => {
                if(!inquiry) 
                    return res.status(NotExist.status)
                              .send(NotExist.msg);

                const status = inquiry.statuses.id(statusId)

                if(!status)
                    return res.status(StatusNotExist.status)
                              .send(StatusNotExist.msg)

                status.set({
                    ...status,
                    note,
                    admin: userId
                })

                Inquiry.save()
                       .then(inquiry => {
                            res.send(status)
                       })
            })
            .catch(next);
}) 


// @route   DELETE api/inquiries/:id
// @desc    Delete inquiry
// @access  Admin
router.delete('/:id', auth, (req, res, next) => {

    const inquiryId = req.params.id;
    const userId = res.locals.user._id;
    const isAdmin = res.locals.user.isAdmin;

    Inquiry.findById(inquiryId)
              .then(inquiry => {
                if(!inquiry) 
                    return res.status(NotExist.status)
                              .send(NotExist.msg);

                if(inquiry.user !== userId && isAdmin) 
                    return res.status(InquiryNotOwned.status)
                              .send(InquiryNotOwned.msg)

                inquiry.remove()
                    .then(() => {
                        return res.status(SuccessDelete.status)
                                  .send(SuccessDelete.msg)
                    })
                    .catch(next)
              })
              .catch(next);
})

module.exports = router;
