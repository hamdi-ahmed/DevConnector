//import modules
const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./config/db')
const userRoutes = require('./routes/userRoute')
const postRoutes = require('./routes/postRoutes')
const profileRoutes = require('./routes/profileRoutes')
const { notFound, errorHandler } = require('./middlewares/errorHandler')

dotenv.config()
const app = express()

//Let user to enter data in body as string
app.use(express.json())

//Connect DB
dbConnection()


//Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/profile', profileRoutes)

app.get('/', (req, res) => {
    res.send('App is running Successfully !!')
})


//Middleware (Error Handling)
app.use(notFound)
app.use(errorHandler)

//Create Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`app is running on port ${PORT}`))