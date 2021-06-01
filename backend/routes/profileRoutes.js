const express = require('express')
const {
    getUserProfile,
    registerUserProfile,
    updateProfile,
    getProfile,
    getUserProfiles,
    getProfileByUserId,
    deleteProfilesAndUsers,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    gitAllRepoFromGithub
} = require('../controller/profileController')
const protect = require('../middleWares/authMiddleware')

const router = express.Router()


router.route('/')
    .post(protect, registerUserProfile)
    .get(getUserProfiles)
    .delete(protect, deleteProfilesAndUsers)

router.route('/experience').put(protect, addExperience)

router.route('/education').put(protect, addEducation)

router.route('/experience/:exp_id').delete(protect, deleteExperience)


router.route('/education/:edu_id').delete(protect, deleteEducation)

router.route('/github/:username').get(gitAllRepoFromGithub)

router.route('/me')
    .get(protect, getUserProfile)

router.route('/user/:user_id').get(getProfileByUserId)

router.route('/:id')
    .get(protect, getProfile)
    .put(protect, updateProfile)




module.exports = router