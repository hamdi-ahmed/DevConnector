const express = require('express')
const { registerUser, loginUser, authUser } = require('../controller/userController')
const protect = require('../middleWares/authMiddleware')

const router = express.Router()


router.route('/').post(registerUser).get(protect, authUser)

router.route('/login').post(loginUser)


module.exports = router