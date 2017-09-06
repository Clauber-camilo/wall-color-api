const mongoose = require('mongoose')

const Schema = mongoose.Schema

const photoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        full: {
            type: String
        }, 
        regular: {
            type: String,
            required: true
        }
    },
    colors: {
        type: Array, 
        required: true
    }
})

module.exports =  mongoose.model('photo', photoSchema)