const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const gravatar = require('gravatar')
const generateToken = require('../util/generateToken')
const { response } = require('express')

// @desc    Users Login
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            date: user.date,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('Invalid email or password')
    }
})

// @desc    Users Registration
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        res.json('User is already exist !!')
    }

    //Get Avatar { size, rating, default image }
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })


    const user = await User.create({
        name,
        email,
        password,
        avatar
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            date: user.date,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const authUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            data: user.date
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


module.exports = {
    registerUser,
    loginUser,
    authUser
}