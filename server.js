const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const app = express()


app.get('/', (req, res) => {
    res.send('App is running Successfully !!')
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`app is running on port ${PORT}`))