const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const authAdmin = require('../../middleware/authAdmin');

// User model
const User = require('../../models/User');
const modelName = 'user';

// Errors
const authMessages = require('../../messages/auth');
const { InvalidCredentials, UserDoesNotExist, NotAuthorizedSelf, SuccessDelete } = authMessages;

// @route   GET api/auth/users
// @desc    Get all users
// @access  Admin
router.get('/users', [auth, authAdmin], (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next)
})

// @route   GET api/auth/users/:id
// @desc    Get user by id
// @access  Admin
router.get('/user/:id', [auth, authAdmin], (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user) return res.status(UserDoesNotExist.status).json(UserDoesNotExist.msg);

            return res.json(user);
        })
        .catch(next)
})

// @route   GET api/auth/user
// @desc    Get user by id from token
// @access  Private
router.get('/user', auth, (req, res, next) => {
    User.findById(res.locals.user.id)
        .select('-password')
        .then(user => res.json(user))
        .catch(next);
})

// @route   POST api/auth/register
// @desc    Register
// @access  Public
router.post('/register', (req, res, next) => {
    const { 
        firstName,
        lastName,
        username,
        isStudent,
        email,
        password
    } = req.body;

    const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        password
    });

    if(isStudent) { 
        newUser.isStudent.isPending = true
    }

    res.locals.model = modelName;

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) next;
            newUser.password = hash;
            newUser.save()
                   .then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.send({
                                    token,
                                    user: { 
                                        id: user.id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        username: user.username,
                                        email: user.email,
                                        isStudent: user.isStudent,
                                        isAdmin: user.isAdmin
                                    }
                                });
                            }
                        )  
                    })
                    .catch(next);
        })
    })
})

// @route   POST api/auth/login
// @desc    Login
// @access  Public
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password)
            return res.status(UserDoesNotExist.status).json(UserDoesNotExist.msg);

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(InvalidCredentials.status).json(InvalidCredentials.msg);

            // Validate password
            bcrypt.compare(password, user.password)
                  .then(isMatch => {
                    if(!isMatch) return res.status(InvalidCredentials.status).send(InvalidCredentials.msg);
                    
                    // Create token and send it back
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 11800 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: { 
                                    id: user.id,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    username: user.username,
                                    isStudent: user.isStudent,
                                    email: user.email,
                                    prefs: user.prefs,
                                    isAdmin: user.isAdmin
                                }
                            });
                        }
                    )     
                    })
                .catch(next);
        })
        .catch(next);
})

// @route   PUT api/auth/user/:id
// @desc    Update user details
// @access  Private
router.put('/user', auth, (req, res, next) => {
    const {
        firstName,
        lastName,
        username,
        isStudent,
        email
    } = req.body

    res.locals.model = modelName;
    const userId = res.locals.user.id;


    User.findById(userId)
        .then(user => {
            if(!user)
                return res.status(UserDoesNotExist.status)
                          .send(UserDoesNotExist.msg)

            

            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
            user.username = username;

            if(isStudent && !user.isStudent.status) {
                user.isStudent.isPending = true
            }

            else {
                user.isStudent.status = isStudent
            }

            user.save()
                .then(user => {
                    // TODO: send verification email 
                    res.send(user)
                })
                .catch(next)        
        })
        .catch(next)
})

// @route   DELETE api/auth/user/:id
// @desc    Delete user
// @access  Admin
router.delete('/user/:id', [auth, authAdmin], (req, res, next) => {
    // If a user tries to delete himself
    if(res.locals.user.id === req.params.id)
        return res.status(NotAuthorizedSelf.status).send(NotAuthorizedSelf.msg)

    User.findById(req.params.id)
        .then(user => {
            if(!user) return res.status(UserDoesNotExist.status).send(UserDoesNotExist.msg)

            user.remove()
                .then(() => {
                    res.send(SuccessDelete.msg)
                })
                .catch(next)
        })
        .catch(next)
})

module.exports = router;