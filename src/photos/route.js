const Router = require('koa-router')

const PhotoController = require('./PhotoController')

const prefix = 'photos'

const router = new Router()

router.prefix(`/api/${prefix}`)

// GET api/photos
// Get a list of all images
router.get('/', PhotoController.find)

// GET /api/photos/id
router.get('/:id', PhotoController.findById)

// GET /api/photos/save-images
// This will save a list of images of the unplash in the mongo database
// @param : page (default: 1)
// @param : per_page (default : 10)
router.post('/save-images', PhotoController.saveAll)

module.exports = router