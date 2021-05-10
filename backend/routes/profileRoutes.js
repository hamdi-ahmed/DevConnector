const express = require('express')

const router = express.Router()

// @desc    Profiles
// @route   /api/Profiles
// @access  /api/public

router.route('/').get((req, res) => {
    res.send('Profiles')
})



module.exports = router