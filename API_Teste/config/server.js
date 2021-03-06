const port = 3000

const bodyParser = require('body-parser')
const express = require('express')
const server = express()

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())



server.listen(process.env.port || port, function(){
    console.log('Online in listening')
})

module.exports = server