const express = require('express')

const router = express.Router()

// @desc    Auth
// @route   /api/auth
// @access  /api/public

router.route('/').get((req, res) => {
    res.send('Auth')
})



module.exports = router