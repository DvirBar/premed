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
const { inquiryStatusTypes, inquiryTypes } = allowedTypes.types;
const { isType } = allowedTypes;

const wasEdited = 'הפנייה נערכה'

// @route   GET api/inquiries/types
// @desc    Get inquiry by id
// @access  Private
router.get('/types', auth, (req, res, next) => {
    return res.status(200).send({
        statusTypes: inquiryStatusTypes,
        inquiryTypes
    })
})


// @route   GET api/inquiries/:id
// @desc    Get inquiry by id
// @access  Admin
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
router.get('/user', auth, (req, res, next) => { 
    const userId = res.locals.user._id

    Inquiry.find({ user: userId })
            .select('-status.admin')
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
            value: inquiryStatusTypes.find(type => type.default),
            active: true
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
        text
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
                    text
                }

                /* After updating inquiry, change inquiry active status to 
                    default, if not already active */
                const statuses = inquiry.statuses;

                const defaultType = inquiryStatusTypes.find(status =>
                    status.default).value

                const activeStatus = statuses.find(inquiry =>
                    inquiry.active);
                
                if(activeStatus.value !== defaultType) {
                    activeStatus.active = false;
                    const defaultStatus = statuses.find(status =>
                        status.default)

                    if(!defaultStatus) {
                        statuses.push({
                            value: defaultType,
                            active: true,
                            note: wasEdited
                        })
                    }
                    else {
                        defaultStatus = {
                            ...defaultStatus,
                            active: true,
                            note: wasEdited
                        }
                    }
                } 

                inquiry.save()
                    .then(inquiry => {
                        return res.send(inquiry)              
                    })
                    .catch(next)
                })
            .catch(next);
});


// @route   POST api/inquiries/:id/assignAdmin
// @desc    Create new inquiry
// @access  Admin
router.put('/:id/assignAdmin', auth, (req, res, next) => {
    const { 
        adminId
    } = req.body;
    
    const inquiryId = req.params.id

    Inquiry.findById(inquiryId)
           .then(inquiry => {
                if(!inquiry)
                    return res.status(NotExist.status)
                              .send(NotExist.send)
                              
                inquiry.assignedAdmin = adminId

                inquiry.save()
                       .then(inquiry => {
                           return res.send(inquiry.assignedAdmin)
                       })
                       .catch(next)
           })
           .catch(next)
})

// @route   PUT api/inquiries/:id/changeStatus
// @desc    Change status
// @access  Admin
router.put('/:id/changeStatus', [auth, authAdmin], (req, res, next) => {
    const {
        value
    } = req.body

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

                // Make currently active status inactive
                const activeStatus = statuses.find(status => status.active)

                if(activeStatus) {
                    activeStatus.set = ({
                        ...activeStatus,
                        active: false
                    })
                }

                const statuses = inquiry.statuses
                const existStatus = statuses.find(status => 
                    status.value === value)

                /* If the requested status already exists, 
                    change its active status to active */

                if(existStatus) {
                    existStatus = true
                }

                else {
                    const newStatus = {
                        value,
                        admin: userId,
                        active: true
                    }

                    statuses.push(newStatus)
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
// @desc    Edit status note
// @access  Private
router.put('/:id/:statusId', [auth, authAdmin], (req, res, next) => {
    const {
        note
    } = req.body
    
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
                       .catch(next)
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
