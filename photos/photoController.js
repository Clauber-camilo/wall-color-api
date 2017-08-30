let axios = require('axios')
let express = require('express')
  , bodyParser = require('body-parser')
  , router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))


function* getImages() {
    axios.get('https://pixabay.com/api/?key=6310797-83fbccb390712a85b3133934d')
        .then(response => response)
}

router.get('/', function(req, res) {
    getImages()
    // User.find({}, function(err, users){
    //     if (err) { 
    //         return res.status(500).send("There was a problem finding the users.")
    //     }
    //     res.status(200).send(users);
    // })
})

module.exports = router