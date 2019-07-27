const postsRouter = require('express').Router
const commentsRouter = require('../comments')
const db = require('../../data/db')

postsRouter.use('/:id/comments', commentsRouter)

//POST Requests



//GET Requests



//PUT Requests



//Delete Requests