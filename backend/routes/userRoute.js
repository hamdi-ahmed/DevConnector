const express = require('express')

const router = express.Router()

// @desc    Users
// @route   /api/users
// @access  /api/public

router.route('/').get((req, res) => {
    res.send('users')
})



module.exports = router