const app = require('./app')

const port = process.env.PORT || 3000

app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`🚀  The magic will happen on port ${port}`)
})