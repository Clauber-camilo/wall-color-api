let mongoose = require('mongoose')

let mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}`

mongoose.connect(mongoUrl, { useMongoClient: true, promiseLibrary: global.Promise })
// mongoose.connect(mongoUrl)

var db = mongoose.connection;

// mongodb error
db.on('error', console.error.bind(console, 'connection error:'));

// mongodb connection open
db.once('open', () => {
    console.log(`Connected to Mongo at: ${new Date()}`)
});