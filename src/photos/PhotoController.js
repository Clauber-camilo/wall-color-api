const axios = require('axios')
    , getColors = require('get-image-colors')
    , MemoryFileSystem = require('memory-fs')
    , fs = new MemoryFileSystem()

const Photo = require('./PhotoModel')

// const mock = require('../lib/mockup')

class PhotoController {
    async find (ctx) {
        ctx.body = await Photo.find()
    }

    async findById (ctx) {
        const response = await Photo.findOne({ id: ctx.params.id })

        ctx.body = response
    }

    async add (ctx) {
        try {
            const photo = await new Photo(ctx.request.body).save()
            ctx.body = photo
        } catch (err) {
            ctx.throw(404)
        }
    }

    async saveAll (ctx) {
        try {
            let colorArray
            const save = []
                , list = {}

            fs.mkdirpSync('/public/images/')

            const unsplashResponse = await axios({
                method: 'GET',
                url: `${process.env.UNSPLASH_URL}/photos`,
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`
                },
                params: {
                    page: ctx.request.query ? ctx.request.query.page : null,
                    per_page: ctx.request.query ? ctx.request.query.per_page : null
                }
            })
    
            for (const [index, item] of unsplashResponse.data.entries()) { //eslint-disable-line
                await axios({
                    method: 'get',
                    url: item.urls.regular,
                    responseType: 'arraybuffer'
                })
                    .then(response => {
                        fs.writeFileSync('/public/images/test.jpg', response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            
                await getColors(fs.readFileSync('/public/images/test.jpg'), 'image/jpg').then(c => {
                    colorArray = c.map(color => color.hex())
                })
    
                fs.unlink('/public/images/test.jpg', err => err)        
    
                list.body = {
                    id: item.id,
                    url: {
                        full: item.urls.full,
                        regular: item.urls.regular
                    },
                    colors: colorArray
                }

                // const photo = await new Photo(list.body).save()
                // save.push(photo)

                console.log(`Save => ${index} of ${ctx.request.query ? ctx.request.query.per_page : 10}`)
            }
            fs.rmdirSync('/public/images/')
            ctx.body = save // list of images
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new PhotoController()