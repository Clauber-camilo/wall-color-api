require('dotenv').config()

const Koa = require('koa')
    , logger = require('koa-logger')
    , router = require('koa-router')()
    , koaBody = require('koa-body')
    , axios = require('axios')
    , getColors = require('get-image-colors')
    , app = new Koa()


const mock = require('./src/lib/mockup')

app.use(logger())

function log () {
    console.log(getColors)
}

log()


// var http = require('http');
// var fs = require('fs');

// var download = function(url, dest, cb) {
//   var file = fs.createWriteStream(dest);
//   var request = http.get(url, function(response) {
//     response.pipe(file);
//     file.on('finish', function() {
//       file.close(cb);
//     });
//   });
// }

router.get('/', async (ctx) => {

    // const photoList = await axios.get('https://unsplash.it/list')

    let pallete

    let photoList = await mock.forEach((photo) => {
        pallete = {
            id: photo.id,
            image: photo.urls.regular,
            colors: getColors(photo.urls.regular).then(colors => colors.map(c => c))
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