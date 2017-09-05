require('dotenv').config()

const Koa = require('koa')
    , logger = require('koa-logger')
    , router = require('koa-router')()
    , koaBody = require('koa-body')
    , axios = require('axios')


const getColors = require('get-image-colors')
    , MemoryFileSystem = require("memory-fs")
    , fs = new MemoryFileSystem()

const app = new Koa()


const mock = require('./src/lib/mockup')

app.use(logger())

function log (log) {
    console.log(log)
}

const util = require('util')
router.get('/', async (ctx) => {

    // const photoList = await axios.get('https://unsplash.it/list')

    let list = []
    let colors

    fs.mkdirpSync("/public/images/")

    for (let item of mock) {

        await axios({
            method:'get',
            url: item.urls.regular,
            responseType:'arraybuffer'
        })
        .then((response) => {            
            fs.writeFileSync('/public/images/test.jpg', response.data)
        })
        .catch(error => {
             log(error)
        })
    
    
        await getColors(fs.readFileSync('/public/images/test.jpg'), 'image/jpg').then(c => {
            colors = c.map(color => color.hex())
        })

        fs.unlink('/public/images/test.jpg', err => err)

        list.push({
            id: item.id,
            url: item.urls.regular,
            cores: colors
        }) 

    }
    fs.rmdirSync('/public/images/')

    ctx.body = list // list of images
})

app 
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app