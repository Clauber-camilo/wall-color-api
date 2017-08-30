require('dotenv').config()

const Koa = require('koa')
    , logger = require('koa-logger')
    , router = require('koa-router')()
    , koaBody = require('koa-body')
    , app = new Koa()
    , axios = require('axios')

app.use(logger())

router.get('/', (ctx, next) => {

    axios.get('https://unsplash.it/list')
        .then(response => {
            ctx.body = response
            
        })
})

app 
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app