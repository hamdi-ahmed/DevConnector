const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')
const User = require('../models/userModel')

// @route     GET api/profile/me
// @desc      Get user profile
// @access    public route
const getUserProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
    if (profile) {
        res.status(201)
        res.json(profile)
    } else {
        res.status(400)
        throw new Error('There is no profile for this user')
    }
})

// @route     post api/profile/
// @desc      Create  new profile
// @access    Private route
const registerUserProfile = asyncHandler(async (req, res) => {
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body

    const profile = await Profile.create({
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        user: req.user._id,
        social: {
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        }
    })

    if (profile) {
        if (skills) {
            profile.skills = skills.split(',').map(skill => skill.trim())
        }

        res.status(201)
        res.json(profile)
    } else {
        res.status(400)
        throw new Error('Invalid Profile Data')
    }
    //console.log(profile.skills);
})



// @route     GET api/profile/
// @desc      Get User profile
// @access    Private route
const getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    res.json(profile)
})


// @route     PUT api/profile/
// @desc      Update new profile
// @access    Private route
const updateProfile = asyncHandler(async (req, res) => {
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body
    const profile = await Profile.findById(req.params.id)
    if (profile) {
        profile.company = company,
            profile.website = website,
            profile.location = location,
            profile.bio = bio,
            profile.status = status,
            profile.githubusername = githubusername,
            profile.skills = skills,
            profile.youtube = youtube,
            profile.facebook = facebook,
            profile.twitter = twitter,
            profile.instagram = instagram,
            profile.linkedin = linkedin

        if (skills) {
            profile.skills = skills.split(',').map(skill => skill.trim())
        }

        const updatedProfile = await profile.save()
        res.json(updatedProfile)
    } else {
        res.status(404)
        throw new Error('Profile not found')
    }
})


// @route     GET api/profile/
// @desc      Get user profile
// @access    public route
const getUserProfiles = asyncHandler(async (req, res) => {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    if (profiles) {
        res.status(201)
        res.json(profiles)
    } else {
        res.status(400)
        throw new Error('There is no profile for this user')
    }
})

// @route     GET api/profile/user/user_id
// @desc      Get profile by user id
// @access    public route
const getProfileByUserId = asyncHandler(async (req, res) => {
    const profiles = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
    if (profiles) {
        res.status(201)
        res.json(profiles)
    } else {
        res.status(400)
        throw new Error('There is no profile for this user')
    }
})

module.exports = {
    registerUserProfile,
    getProfile,
    updateProfile,
    getUserProfile,
    getUserProfiles,
    getProfileByUserId
}