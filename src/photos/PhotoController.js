const axios = require('axios')
    , getColors = require('get-image-colors')
    , MemoryFileSystem = require("memory-fs")
    , fs = new MemoryFileSystem()

const Photo = require('./PhotoModel')

// const mock = require('../lib/mockup')

class PhotoController {
    async find (ctx) {
        ctx.body = await Photo.find()
    }

    async findById (ctx) {
        const response = await Photo.findOne({ id: ctx.params.id })

        ctx.body = response ? response : 'Not found any image with this id'
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
        console.log('Aehooooo')

        let list = { request: {}}
        let colorArray
        let save = []


        fs.mkdirpSync("/public/images/")

        const unsplashResponse = await axios({
            method: 'GET',
            url: `${process.env.UNSPLASH_URL}/photos?per_page=100`,
            headers: {
                'Authorization' : `Client-ID ${process.env.UNSPLASH_CLIENT_ID}`
            }
        })

        console.log(unsplashResponse)

        for (let item in unsplashResponse) {

            await axios({
                method:'get',
                url: item.urls.regular,
                responseType:'arraybuffer'
            })
            .then((response) => {            
                fs.writeFileSync('/public/images/test.jpg', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        
            await getColors(fs.readFileSync('/public/images/test.jpg'), 'image/jpg').then(c => {
                colorArray = c.map(color => color.hex())
            })

            fs.unlink('/public/images/test.jpg', err => err)        

            list.request.body = {
                id: item.id,
                url: { 
                    full: item.urls.full,
                    regular: item.urls.regular 
                },
                colors: colorArray
            }

            // console.log(list)
            const photo = await new Photo(list.request.body).save()
            save.push(photo) 
            
        }

        fs.rmdirSync('/public/images/')

        ctx.body = save // list of images
    }
}

module.exports = new PhotoController()