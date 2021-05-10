const express = require('express')

const router = express.Router()

// @desc    Posts
// @route   /api/posts
// @access  /api/public

router.route('/').get((req, res) => {
    res.send('Posts')
})



module.exports = router