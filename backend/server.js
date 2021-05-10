//import modules
const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./config/db')
const userRoutes = require('./routes/userRoute')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')
const profileRoutes = require('./routes/profileRoutes')

dotenv.config()
const app = express()

//Connect DB
dbConnection()


//Middleware
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/profiles', profileRoutes)

app.get('/', (req, res) => {
    res.send('App is running Successfully !!')
})


//Create Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`app is running on port ${PORT}`))