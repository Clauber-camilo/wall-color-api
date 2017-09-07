require('dotenv').config()

const Koa = require('koa')
    , logger = require('koa-logger')
    , koaBody = require('koa-body')
    , db = require('./src/lib/db')

const router = require('./src/photos/route')

const app = new Koa()

app.use(logger())

app 
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app