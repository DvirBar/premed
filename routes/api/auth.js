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
            if(!user) return res.status(400).json({ msg: 'User does not exist' });

            return res.json(user);
        })
        .catch(next)
})

// @route   GET api/auth/user
// @desc    Get user by id from token
// @access  Private
router.get('/user', auth, (req, res, next) => {
    User.findById(res.locals.user.id)
        .select('-password -isAdmin')
        .then(user => res.json(user))
        .catch(next);
})

// @route   POST api/auth/register
// @desc    Register
// @access  Public
router.post('/register', (req, res, next) => {
    const { 
        email,
        password
    } = req.body;

    const newUser = new User({
        email,
        password
    });

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
                                res.json({
                                    token,
                                    user: { 
                                        id: user.id,
                                        first_name: user.first_name,
                                        last_name: user.last_name,
                                        email: user.email,
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
            return res.status(400).json({ msg: 'Missing details'});

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist' });

            // Validate password
            bcrypt.compare(password, user.password)
                  .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
                    
                    // Create token and send it back
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: { 
                                    id: user.id,
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
        email
    } = req.body

    res.locals.model = modelName;

    user.email = email;
    user.save()
        .then(user => {
            // TODO: send verification email 
            res.json(user)
        })
        .catch(next)
})

// @route   DELETE api/auth/user/:id
// @desc    Delete user
// @access  Admin
router.delete('/user/:id', [auth, authAdmin], (req, res, next) => {
    // If a user tries to delete himself
    if(res.locals.user.id === req.params.id)
        return res.status(403).send({ msg: 'Users are not authorized to delete themselves' })

    User.findById(req.params.id)
        .then(user => {
            if(!user) return res.status(404).send({ msg: 'User does not exist' })

            user.remove()
                .then(() => {
                    res.send({ msg: 'User was successfully deleted' })
                })
                .catch(next)
        })
        .catch(next)
})

module.exports = router;