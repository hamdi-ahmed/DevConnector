const { compareSync } = require('bcryptjs')
const request = require('request')
//const config = require('config')
const expressAsyncHandler = require('express-async-handler')
const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')
const User = require('../models/userModel')
const { json } = require('express')

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


// @route     DELETE api/profile/
// @desc      Delete user and profiles
// @access    private route
const deleteProfilesAndUsers = asyncHandler(async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id })
        await User.findOneAndRemove({ _id: req.user.id })
        res.json('Deleted')
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})

// @route     PUT api/profile/experience
// @desc      Add experience
// @access    private route
const addExperience = asyncHandler(async (req, res) => {
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    //Assign the values to a new object 
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    const profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
        profile.experience.unshift(newExp)
        await profile.save()
        res.json(profile)
    } else {
        res.status(404)
        throw new Error('Profile not found')
    }
})


// @route     DELETE api/profile/experience
// @desc      Delete experience
// @access    private route
const deleteExperience = asyncHandler(async (req, res) => {
    try {
        //find profile
        const profile = await Profile.findOne({ user: req.user.id })
        //find the exp that i want to delete
        const profileExp = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id)
        //deleted 
        profile.experience.splice(profileExp, 1)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.error('Server Error')
        res.status(500)
    }
})

// @route     PUT api/profile/education
// @desc      Add education
// @access    private route
const addEducation = asyncHandler(async (req, res) => {
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

    const addEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    const profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
        profile.education.unshift(addEdu)
        await profile.save()
        res.json(profile)
    } else {
        res.status(404)
        throw new Error('Profile not found')
    }
})


// @route     DELETE api/profile/education/edu_id
// @desc      Delete education
// @access    private route
const deleteEducation = asyncHandler(async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const deleteEdu = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id)
        profile.education.splice(deleteEdu, 1)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err)
        res.status(500)
    }
})

// @route     GET api/profile/github/username
// @desc      Get all repo from github
// @access    public route
const gitAllRepoFromGithub = asyncHandler(async (req, res) => {
    const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc
        &clientId=${process.env.GITHUB_CLIENT_ID}$clientSecret=${process.env.GITHUB_CLIENT_SECRET}
        `,
        method: "GET",
        headers: { 'user-agent': 'node.js' }
    }
    request(options, (error, response, body) => {
        if (error) console.error(error)

        if (response.statusCode !== 200) {
            return res.status(404).json('No github profile found')
        }
        res.json(JSON.parse(body))
    })
})

module.exports = {
    registerUserProfile,
    getProfile,
    updateProfile,
    getUserProfile,
    getUserProfiles,
    getProfileByUserId,
    deleteProfilesAndUsers,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    gitAllRepoFromGithub
}