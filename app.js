require('dotenv').config()

const Koa = require('koa')
    , logger = require('koa-logger')
    , koaBody = require('koa-body')
    , db = require('./src/lib/db')

const router = require('./src/routes')


console.log(router)

const app = new Koa()

app.use(logger())

// router.get('/', async (ctx) => {

//     // const photoList = await axios.get('https://unsplash.it/list')

    
// })

app 
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app