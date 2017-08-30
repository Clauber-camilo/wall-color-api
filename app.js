let express = require('express')
  , app = express()
  , db = require('./db')

let UserController = require('./user/userController')  

let PhotoController = require('./photos/photoController')

app.use('/photos', PhotoController)

app.use('/users', UserController)

module.exports = app