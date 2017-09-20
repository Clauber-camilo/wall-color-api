const mongoose = require('mongoose')

const { Schema } = mongoose

const photoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    url: {
        full: String,
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

module.exports = mongoose.model('photo', photoSchema)