const Router = require('koa-router')

const PhotoController = require('../Controllers/photos')

const prefix = 'photos'

const router = new Router()

router.prefix(`api/${prefix}`)

router.get('/', PhotoController.saveAll)

module.exports = router