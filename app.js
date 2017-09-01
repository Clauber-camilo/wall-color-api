require('dotenv').config()

const Koa = require('koa')
    , logger = require('koa-logger')
    , router = require('koa-router')()
    , koaBody = require('koa-body')
    , axios = require('axios')
    , ct = require('color-thief-standalone')
    , app = new Koa()
    , ColorThief = new ct()

const mock = require('./src/lib/mockup')

app.use(logger())

function log () {
    console.log(ColorThief)
}

log()

router.get('/', async (ctx) => {

    // const photoList = await axios.get('https://unsplash.it/list')

    let pallete

    let photoList = await mock.forEach((photo) => {
        pallete = {
            id: photo.id,
            image: photo.urls.regular,
            colors: ColorThief.getPalette(photo.urls.regular) 
        }

        return pallete
    });

    ctx.body = pallete // list of images
})

app 
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app