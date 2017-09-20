const mongoose = require('mongoose')

const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}`

mongoose.connect(mongoUrl, { useMongoClient: true, promiseLibrary: global.Promise })
// mongoose.connect(mongoUrl)

const db = mongoose.connection

// mongodb error
db.on('error', console.error.bind(console, 'connection error:')) //eslint-disable-line

// mongodb connection open
db.once('open', () => {
    console.log(`Connected to Mongo at: ${new Date()}`) //eslint-disable-line
})