const express = require('express')
const server = express()
const postsRouter = require('./routes/posts/postsRouter')

server.use(express.json())
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.json({
        message: `There is nothing here. You are at the root directory.`
    })
})

module.exports = server