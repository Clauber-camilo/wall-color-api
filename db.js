let mongoose = require('mongoose')

mongoose.connect( 
    'mongodb://clauber-camilo:9D4zfifiYBu9zPrv@color-wall-shard-00-00-begqr.mongodb.net:27017,color-wall-shard-00-01-begqr.mongodb.net:27017,color-wall-shard-00-02-begqr.mongodb.net:27017/test?ssl=true&replicaSet=color-wall-shard-0&authSource=admin'
)