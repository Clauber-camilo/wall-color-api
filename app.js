// let express = require('express')
//   , app = express()
//   , db = require('./db')

// let UserController = require('./user/userController')  

// let PhotoController = require('./photos/photoController')

// app.use('/photos', PhotoController)

// app.use('/users', UserController)

// module.exports = app

const app = require('koa')
    , logger = require('koa-logger')


app.use(logger)




module.exports = app