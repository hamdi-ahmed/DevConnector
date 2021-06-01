const Post = require('../models/postModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// @route     POST api/posts
// @desc      Add post
// @access    private route
const addPost = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (user) {
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)
    } else {
        res.status(404)
        throw new Error('User not found, you need to sign up')
    }
})

// @route     GET api/posts
// @desc      Get all posts
// @access    private route
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
    if (posts) {
        res.status(201)
        res.json(posts)
    } else {
        res.status(401)
        throw new Error('No Posts yet')
    }
})


// @route     GET api/posts/:id
// @desc      Get post by id
// @access    private route
const getPostById = asyncHandler(async (req, res) => {
    const posts = await Post.findById(req.params.id)
    if (posts) {
        res.status(201)
        res.json(posts)
    } else {
        res.status(401)
        throw new Error('Post not found')
    }
})

// @route     DELETE api/posts/:id
// @desc      Delete post
// @access    private route
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        //Check user
        if (post.user.toString() !== req.user.id) {
            res.status(401).json("You're not authorized to delete the post")
        }
        await post.remove()
        res.json('Post is deleted')
    } else {
        res.status(404).json('Post not found')
    }
})

// @route     PUT api/posts/like/:id
// @desc      Add Like
// @access    private route
const addLike = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        //Check if user like this post before or not 
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            res.status(400).json("You're already like this post")
        } else {
            post.likes.unshift({ user: req.user.id })
            await post.save()
            res.json(post.likes)
        }
    } else {
        res.status(404).json('Post not found')
    }
})


// @route     PUT api/posts/unlike/:id
// @desc      Remove Like
// @access    private route
const removeLike = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        //Check if user like this post before or not 
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            res.status(400).json("The post hasn't have any likes yet")
        } else {
            const removeLike = post.likes
                .map(like => like.user.toString())
                .indexOf(req.user.id)

            post.likes.splice(removeLike, 1)
            await post.save()
            res.json(post.likes)
        }
    } else {
        res.status(404).json('Post not found')
    }
})


// @route     POST api/posts/comment
// @desc      Add Comment
// @access    private route
const addComment = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.unshift(newComment)
        await post.save()
        res.json(post.comments)
    } catch (err) {
        console.error(err)
        res.status(500)
    }
})

// @route     DELETE api/posts/comment/:id/comment_id
// @desc      Delete Comment
// @access    private route
const deleteComment = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id)
        if (comment) {
            //check user
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json("You're not authorized to delete the comment")
            } else {
                const deleteComment = post.comments
                    .map(comment => comment.user.toString)
                    .indexOf(req.user.id)
                post.comments.splice(deleteComment, 1)
                await post.save()
                res.status(201).json(post.comments)
            }
        } else {
            return res.status(404).json('Comment not found')
        }
    } catch (err) {
        console.error(err)
        res.status(500)
    }
})

module.exports = {
    addPost,
    getAllPosts,
    deletePost,
    getPostById,
    addLike,
    removeLike,
    addComment,
    deleteComment
}