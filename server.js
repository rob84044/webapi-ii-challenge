const express = require('express')
const server = express()
const postsRouter = require('./routes/posts')

server.use(express.json())
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
    res.send('Welcome to the Webapi-ii-challenge page. Unfortunately, no front end page has been built yet')
})

module.exports = server