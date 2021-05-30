const express = require('express')
const { getUserProfile, registerUserProfile, updateProfile, getProfile, getUserProfiles, getProfileByUserId } = require('../controller/profileController')
const protect = require('../middleWares/authMiddleware')

const router = express.Router()


router.route('/')
    .post(protect, registerUserProfile)
    .get(getUserProfiles)


router.route('/me')
    .get(protect, getUserProfile)

router.route('/user/:user_id').get(getProfileByUserId)

router.route('/:id')
    .get(protect, getProfile)
    .put(protect, updateProfile)




module.exports = router