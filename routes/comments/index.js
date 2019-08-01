/**
 * `mergeParams`: Preserve the req.params values from the parent router.
 * In this case, the parent router is `postsRouter` so `req.params.id` would
 * refer to a specific post for example.
 * Source: https://expressjs.com/en/4x/api.html#express.router
 */
const commentsRouter = require('express').Router({ mergeParams: true })
const db = require('../../data/db')

//GET requests
commentsRouter.get('/', async(req, res) => {
    const postId = req.params.id
    try {
        const post = (await db.findById(postId))[0]
        if (!post) {
            res.status(404).json({
                success: false,
                error: `The post with the specified ID does not exist`
            })
        } else {
            const comments = await db.findPostComments(postId)
            res.status(200).json({
                success: true,
                comments
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `The comments information could not be retrieved`
        })
    }
})

//POST requests
commentsRouter.post('/', async(req, res) => {
    const postId = req.params.id
    const { text } = req.body
    if (!text) {
        return res.status(400).json({
            success: false,
            error: `Please provide text for the comment`
        })
    }
    try {
        const post = (await db.findById(postId))[0]
        if (!post) {
            res.status(404).json({
                success: false,
                error: `The post with the specified ID does not exist`
            })
        } else {
            const { id } = await db.insertComment({ text, post_id: postId })
            const comment = (await db.findCommentById(id))[0]
            res.status(201).json({
                success: true,
                comment
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `An error occurred while saving the comment to the database`,
        })
    }
})

module.exports = commentsRouter