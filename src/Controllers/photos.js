const axios = require('axios')
    , getColors = require('get-image-colors')
    , MemoryFileSystem = require("memory-fs")
    , fs = new MemoryFileSystem()

const Photo = require('../Models/photos')



const mock = require('../lib/mockup')


class PhotoController {
    async find (ctx) {
        ctx.body = await Photo.find()
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
        let list = { request: {}}
        let colorArray
        let save = []

        console.log('Aehooooo')
    
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

            save.push(await this.add(list))
            
        }

        fs.rmdirSync('/public/images/')
    
        ctx.body = save // list of images
    }
}

module.exports = new PhotoController()