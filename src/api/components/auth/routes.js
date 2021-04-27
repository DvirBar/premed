import express from 'express';
const router = express.Router();
import auth from '../../../../middleware/auth'
import authAdmin from '../../../../middleware/authAdmin'
import UserController from './controller'

// @route   GET api/auth/users
// @desc    Get all users
// @access  Admin
router.get('/users', [auth, authAdmin], UserController.getAllUsers)

// @route   GET api/auth/users
// @desc    Get all users
// @access  Admin
router.get('/isUsernameAvailable', UserController.getAllUsers)

// @route   GET api/auth/user
// @desc    Get user by id from token
// @access  Private
router.get('/user', auth, UserController.getUserByToken)

// @route   POST api/auth/register
// @desc    Register
// @access  Public
router.post('/register', UserController.create)

// @route   POST api/auth/login
// @desc    Login
// @access  Public
router.post('/login', UserController.login)

// @route   POST api/auth/refreshToken
// @desc    Use refresh token to get a new access token
// @access  Private
router.post('/refreshToken', UserController.refreshToken)

// @route   POST api/auth/logout
// @desc    Log user out
// @access  Private
router.post('/logout', UserController.logout)

// @route   PUT api/auth/user/:id
// @desc    Update user details
// @access  Private
router.put('/user', auth, UserController.editUser)

// @route   DELETE api/auth/user/:id
// @desc    Delete user
// @access  Admin
router.delete('/user/:id', [auth, authAdmin], UserController.deleteUser)

module.exports = router;