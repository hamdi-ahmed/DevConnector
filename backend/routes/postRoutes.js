const express = require('express')
const protect = require('../middleWares/authMiddleware')

const {
    addPost,
    getAllPosts,
    deletePost,
    getPostById,
    addLike,
    removeLike,
    addComment,
    deleteComment
} = require('../controller/postController')
const router = express.Router()



router.route('/')
    .post(protect, addPost)
    .get(protect, getAllPosts)

router.route('/:id')
    .get(protect, getPostById)
    .delete(protect, deletePost)

router.route('/like/:id').put(protect, addLike)
router.route('/unlike/:id').put(protect, removeLike)

router.route('/comment/:id').post(protect, addComment)

router.route('/comment/:id/:comment_id').delete(protect, deleteComment)

module.exports = router