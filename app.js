require('dotenv').config()

const Koa = require('koa')
    , logger = require('koa-logger')
    , router = require('koa-router')()
    , koaBody = require('koa-body')
    , axios = require('axios')


const getColors = require('get-image-colors')
    , streams = ('memory-streams')
    , fs = require('fs')

const app = new Koa()


const mock = require('./src/lib/mockup')

app.use(logger())

function log (log) {
    console.log(log)
}


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
const util = require('util')
router.get('/', async (ctx) => {

    // const photoList = await axios.get('https://unsplash.it/list')

    let pallete = []
    let image
    let colors

    // for (let item of mock) {

        

    // }

    // image = await axios.get(mock[0].urls.regular)

    // await axios({
    //     method:'get',
    //     url: mock[0].urls.regular,
    //     responseType:'stream'
    // })
    // .then((response) => {
    //     log(response.data)
    //     image = response.data.pipe(fs.createWriteStream('./test.jpg'))
    // });
    
    // fs.mkdirpSync('./images')
    // fs.writeFileSync('./images/image.jpg', image)
    // log(util.inspect(image.data, {depth: null}))

    // fs.writeFile('./image.jpg', image.data, function(err){
    //     if (err) throw err
    //     console.log('File saved.')
    // })


    await getColors('./test.jpg').then(c => {
        colors = c.map(color => color.hex())
    })
            
    log(colors)

    pallete.push({
        id: mock[0].id,
        cores: colors
    })

    // mock.forEach((photo) => {
    //     pallete = {
    //         id: photo.id,
    //         image: photo.urls.regular,
    //         colors: getColors(photo.urls.regular).then(colors => colors.map(c => c))
    //     }

    //     return pallete
    // });

    ctx.body = pallete // list of images
})

app 
    .use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app